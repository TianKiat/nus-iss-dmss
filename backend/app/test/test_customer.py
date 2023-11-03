import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import base, invoice, user_profile, vendor_profile, order, menu_item, promotion, opening_hours
from app.helper import test_fixtures
from app.common.user_model import UserID
from app.common.invoice_model import IsFavorite, InvoiceStatus, InvoiceID, DraftInvoiceMenuItem, DraftInvoice
from app.common.vendor_profile_model import ProfileIDs
from app.apicontroller.customer_controller import CustomerController
from app.apicontroller.vendor_controller import VendorController

class TestCustomerController(unittest.TestCase):

    def setUp(self):
        # Set up an in-memory SQLite database
        self.engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

        # Create the tables
        base.Base.metadata.create_all(bind=self.engine)

        # Set up fixtures for common tables
        test_fixtures.setup_test_fixtures(self.session)
    
    def tearDown(self):
        self.session.close()

    def test_update_order_basket(self):
        # Add new order
        draftInvoice = DraftInvoice(
            userID=3,
            vendorProfileID=1,
            menuItems=[DraftInvoiceMenuItem(menuItemID=1, quantity=1)]
        )
        result = CustomerController().update_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)
        self.assertIsNotNone(result["invoiceID"])
        self.assertIsNotNone(result["orderID"])

        # Check if it is updated in database
        updated_invoice = self.session.query(invoice.Invoice.invoiceID).filter(invoice.Invoice.invoiceID == result["invoiceID"]).first()
        self.assertIsNotNone(updated_invoice)
        updated_order = self.session.query(order.Order.orderID).filter(order.Order.orderID == result["orderID"]).first()
        self.assertIsNotNone(updated_order)

        # Add new order with existing invoice
        draftInvoice.menuItems[0].menuItemID = 2
        result = CustomerController().update_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)
        self.assertIsNotNone(result["invoiceID"])
        self.assertIsNotNone(result["orderID"])

        # Check if it is updated in database
        updated_order = self.session.query(order.Order.orderID).filter(order.Order.orderID == result["orderID"]).first()
        self.assertIsNotNone(updated_order)

        # Update order with existing invoice and existing order
        draftInvoice.menuItems[0].quantity = 5
        result = CustomerController().update_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)
        self.assertIsNotNone(result["invoiceID"])
        self.assertIsNotNone(result["orderID"])

        # Check if it is updated in database
        updated_order = self.session.query(order.Order.quantity).filter(order.Order.orderID == result["orderID"]).first()
        self.assertIsNotNone(draftInvoice.menuItems[0].quantity, updated_order.quantity)

        # Update order basket with quantity 0 (delete order)
        draftInvoice.menuItems[0].quantity = 0
        result = CustomerController().update_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)
        self.assertIsNotNone(result["invoiceID"])
        self.assertIsNone(result["orderID"])

        # Check if it is updated in database
        updated_order = self.session.query(order.Order).filter(order.Order.invoiceID == result["invoiceID"], order.Order.menuItemID == draftInvoice.menuItems[0].menuItemID).first()
        self.assertIsNone(updated_order)
        updated_invoice = self.session.query(invoice.Invoice.invoiceID).filter(invoice.Invoice.invoiceID == result["invoiceID"]).first()
        self.assertIsNotNone(updated_invoice)

        # Update order basket with last menuitem quantity 0 (delete order and invoice)
        draftInvoice.menuItems[0].menuItemID = 1
        result = CustomerController().update_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)
        self.assertIsNone(result["invoiceID"])

        # Check if it is updated in database
        customerProfileID = self.session.query(user_profile.UserProfile.userProfileID).filter(user_profile.UserProfile.userID == draftInvoice.userID).first()
        updated_invoice = self.session.query(invoice.Invoice.invoiceID).filter(
            invoice.Invoice.customerProfileID == customerProfileID[0],
            invoice.Invoice.vendorProfileID == draftInvoice.vendorProfileID,
            invoice.Invoice.status == "DRAFT"
        ).first()
        self.assertIsNone(updated_invoice)

        # Add order basket with multiple menu items, including valid and invalid menu items
        draftInvoice = DraftInvoice(
            userID=3,
            vendorProfileID=1,
            menuItems=[
                DraftInvoiceMenuItem(menuItemID=1, quantity=1),
                DraftInvoiceMenuItem(menuItemID=2, quantity=2),
                DraftInvoiceMenuItem(menuItemID=3, quantity=3)
            ]
        )
        result = CustomerController().update_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)
        self.assertIsNotNone(result["invoiceID"])
        self.assertIsNotNone(result["orderIDs"])

        # Check if it is updated in database
        updated_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.invoiceID == result["invoiceID"]).first()
        self.assertIsNotNone(updated_invoice)
        updated_orders = self.session.query(order.Order).filter(order.Order.invoiceID == result["invoiceID"]).all()
        self.assertIsNotNone(updated_orders)
        self.assertEqual(2, len(updated_orders))
        self.assertEqual(result["orderIDs"][0], updated_orders[0].orderID)
        self.assertEqual(result["orderIDs"][1], updated_orders[1].orderID)

        # Add order basket with all invalid menu items
        draftInvoice = DraftInvoice(
            userID=3,
            vendorProfileID=1,
            menuItems=[
                DraftInvoiceMenuItem(menuItemID=2, quantity=2),
                DraftInvoiceMenuItem(menuItemID=4, quantity=1)
            ]
        )
        result = CustomerController().update_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)
        self.assertIsNone(result["invoiceID"])

        # Add order basket having an invoice with the same vendor
        draftInvoice = DraftInvoice(
            userID=3,
            vendorProfileID=1,
            menuItems=[
                DraftInvoiceMenuItem(menuItemID=1, quantity=2),
                DraftInvoiceMenuItem(menuItemID=2, quantity=1)
            ]
        )
        result = CustomerController().update_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)
        self.assertIsNone(result["invoiceID"])

    def test_get_order_history(self):
        # test with existing data
        userID = UserID(userID=3)
        expected_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.status == "DONE").first()
        expected_vendor = self.session.query(vendor_profile.VendorProfile).filter(vendor_profile.VendorProfile.vendorProfileID == expected_invoice.vendorProfileID).first()
        expected_orders = self.session.query(order.Order).join(invoice.Invoice).filter(invoice.Invoice.invoiceID == expected_invoice.invoiceID).all()
        expected_result = [{
            "invoice": expected_invoice,
            "vendor": expected_vendor,
            "orders": expected_orders
        }]
        result = CustomerController().get_order_history(self.session, userID)
        self.assertEqual(result, expected_result)

        # test with existing userID and non-existing invoice
        userID.userID = 2
        expected_result = []
        result = CustomerController().get_order_history(self.session, userID)
        self.assertEqual(result, expected_result)

        # test with non-existing userID
        userID.userID = 0
        expected_result = []
        result = CustomerController().get_order_history(self.session, userID)
        self.assertEqual(result, expected_result)

    def test_get_order_basket(self):
        # test with existing data
        userID = UserID(userID=3)
        expected_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.status == "DRAFT").first()
        expected_vendor = self.session.query(vendor_profile.VendorProfile).filter(vendor_profile.VendorProfile.vendorProfileID == expected_invoice.vendorProfileID).first()
        expected_orders = self.session.query(order.Order).join(invoice.Invoice).filter(invoice.Invoice.invoiceID == expected_invoice.invoiceID).all()
        expected_result = [{
            "invoice": expected_invoice,
            "vendor": expected_vendor,
            "orders": expected_orders
        }]
        result = CustomerController().get_order_basket(self.session, userID)
        self.assertEqual(result, expected_result)

        # test with existing userID and non-existing invoice
        userID.userID = 2
        expected_result = []
        result = CustomerController().get_order_basket(self.session, userID)
        self.assertEqual(result, expected_result)

        # test with non-existing userID
        userID.userID = 0
        expected_result = []
        result = CustomerController().get_order_basket(self.session, userID)
        self.assertEqual(result, expected_result)
    
    def test_update_favorite_order(self):
        # Update invoice isFavorite with existing data
        isFavorite = IsFavorite(invoiceID=1, isFavorite=True)
        result = CustomerController().update_favorite_order(self.session, isFavorite)
        self.assertEqual(isFavorite.invoiceID, result["invoiceID"])
        self.assertEqual(True, result["isFavorite"])

        # Check if it is updated in database
        updated_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.invoiceID == isFavorite.invoiceID).first()
        self.assertEqual(True, updated_invoice.isFavorite)

        # Update invoice isFavorite with non-existing data
        isFavorite = IsFavorite(invoiceID=0, isFavorite=True)
        result = CustomerController().update_favorite_order(self.session, isFavorite)
        self.assertEqual(None, result["invoiceID"])
    
    def test_update_order_status(self):
        # Update invoice status with existing data
        invoiceStatus = InvoiceStatus(invoiceID=1, status="CANCELLED")
        result = CustomerController().update_order_status(self.session, invoiceStatus)
        self.assertEqual(invoiceStatus.invoiceID, result["invoiceID"])
        self.assertEqual(invoiceStatus.status, result["status"])

        # Check if it is updated in database
        updated_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.invoiceID == invoiceStatus.invoiceID).first()
        self.assertEqual(invoiceStatus.status, updated_invoice.status)

        # Update invoice status with non-existing data
        invoiceStatus = InvoiceStatus(invoiceID=0, status="CANCELLED")
        result = CustomerController().update_order_status(self.session, invoiceStatus)
        self.assertEqual(None, result["invoiceID"])

        # Update invoice status and discount with existing data
        invoiceStatus = InvoiceStatus(invoiceID=2, status="PENDING", discount=5)
        result = CustomerController().update_order_status(self.session, invoiceStatus)
        self.assertEqual("PENDING", result["status"])

        # Check if it is updated in database
        updated_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.invoiceID == invoiceStatus.invoiceID).first()
        self.assertEqual(invoiceStatus.status, updated_invoice.status)
        self.assertEqual(invoiceStatus.discount, updated_invoice.discount)

    def test_delete_order(self):
        # Delete invoice with existing data
        invoiceID = InvoiceID(invoiceID=1)
        result = CustomerController().delete_order(self.session, invoiceID)
        self.assertEqual(invoiceID.invoiceID, result["invoiceID"])

        # Check if it is updated in database
        updated_order = self.session.query(order.Order).filter(order.Order.invoiceID == invoiceID.invoiceID).all()
        updated_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.invoiceID == invoiceID.invoiceID).first()
        self.assertEqual([], updated_order)
        self.assertEqual(None, updated_invoice)

        # Delete invoice with non-existing data
        invoiceID = InvoiceID(invoiceID=0)
        result = CustomerController().delete_order(self.session, invoiceID)
        self.assertEqual(invoiceID.invoiceID, result["invoiceID"])

    def test_get_valid_menu_item(self):
        profileIDs = ProfileIDs(
            userID=3,
            vendorProfileID=1
        )
        expected_result = [{
            "menuItem": self.session.query(menu_item.MenuItem).filter(menu_item.MenuItem.menuItemID == 1).first(),
            "order": self.session.query(order.Order).filter(order.Order.menuItemID == 1, order.Order.invoiceID == 2).first()
        }, {
            "menuItem": self.session.query(menu_item.MenuItem).filter(menu_item.MenuItem.menuItemID == 3).first(),
            "order": self.session.query(order.Order).filter(order.Order.menuItemID == 3, order.Order.invoiceID == 2).first()
        }]
        result = CustomerController().get_valid_menu_item(self.session, profileIDs)
        self.assertEqual(expected_result, result)

    # def test_get_all_vendor_profile(self):
    #     expected_result = []
    #     vendors = self.session.query(vendor_profile.VendorProfile).all()
    #     for vendor in vendors:
    #         expected_result.append({
    #             "vendor": vendor,
    #             "opening_hours": VendorController.get_opening_hours(self.session, vendor.userID)
    #         })
    #     result = CustomerController().get_all_vendor_profile(self.session)
    #     self.assertEqual(expected_result, result)

    def test_get_promotion_verify(self):
        # test with existing valid promo code
        vendorProfileID = 1
        promoCode = "NDP2023"
        expected_result = self.session.query(promotion.Promotion).filter(
            promotion.Promotion.vendorProfileID == vendorProfileID,
            promotion.Promotion.promoCode == promoCode,
            promotion.Promotion.isValid
        ).first()
        result = CustomerController().get_promotion_verify(self.session, vendorProfileID, promoCode)
        self.assertEqual(expected_result, result)

        # test with existing invalid promo code
        promoCode = "CNY2023"
        expected_result = None
        result = CustomerController().get_promotion_verify(self.session, vendorProfileID, promoCode)
        self.assertEqual(expected_result, result)

        # test with non-existing promo code
        promoCode = "ANYTHING123"
        expected_result = None
        result = CustomerController().get_promotion_verify(self.session, vendorProfileID, promoCode)
        self.assertEqual(expected_result, result)

    def test_get_promotion(self):
        # test with existing vendor profile ID 
        vendorProfileID = 1
        expected_result = self.session.query(promotion.Promotion).filter(
            promotion.Promotion.vendorProfileID == vendorProfileID,
            promotion.Promotion.isValid
        ).all()
        result = CustomerController().get_promotion(self.session, vendorProfileID)
        self.assertEqual(expected_result, result)

        # test with non-existing vendor profile ID
        vendorProfileID = 0
        expected_result = []
        result = CustomerController().get_promotion(self.session, vendorProfileID)
        self.assertEqual(expected_result, result)