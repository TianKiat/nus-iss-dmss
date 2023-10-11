import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import base, invoice, vendor_profile, order
from app.helper import test_fixtures
from app.common.user_model import UserID
from app.common.invoice_model import IsFavorite, InvoiceStatus, InvoiceID, DraftInvoice
from app.apicontroller.customer_controller import CustomerController

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

    def test_create_order_basket(self):
        # Create order basket with non-existing invoice
        draftInvoice = DraftInvoice(
            userID=3,
            vendorProfileID=1,
            menuItemID=1,
            quantity=1
        )
        result = CustomerController.create_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)

        # Check if it is updated in database
        updated_invoice = self.session.query(invoice.Invoice.invoiceID).filter(invoice.Invoice.invoiceID == result["invoiceID"]).first()
        self.assertIsNotNone(updated_invoice)
        updated_order = self.session.query(order.Order.orderID).filter(order.Order.orderID == result["orderID"]).first()
        self.assertIsNotNone(updated_order)

        # Create order basket with existing invoice and non-existing order
        draftInvoice.menuItemID = 2
        result = CustomerController.create_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)

        # Check if it is updated in database
        updated_order = self.session.query(order.Order.orderID).filter(order.Order.orderID == result["orderID"]).first()
        self.assertIsNotNone(updated_order)

        # Create order basket with existing invoice and existing order
        draftInvoice.quantity = 5
        result = CustomerController.create_order_basket(self.session, draftInvoice)
        self.assertIsNotNone(result)

        # Check if it is updated in database
        updated_order = self.session.query(order.Order.quantity).filter(order.Order.orderID == result["orderID"]).first()
        self.assertIsNotNone(draftInvoice.quantity, updated_order.quantity)

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
        result = CustomerController.get_order_history(self.session, userID)
        self.assertEqual(result, expected_result)

        # test with existing userID and non-existing invoice
        userID.userID = 2
        expected_result = []
        result = CustomerController.get_order_history(self.session, userID)
        self.assertEqual(result, expected_result)

        # test with non-existing userID
        userID.userID = 0
        expected_result = []
        result = CustomerController.get_order_history(self.session, userID)
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
        result = CustomerController.get_order_basket(self.session, userID)
        self.assertEqual(result, expected_result)

        # test with existing userID and non-existing invoice
        userID.userID = 2
        expected_result = []
        result = CustomerController.get_order_basket(self.session, userID)
        self.assertEqual(result, expected_result)

        # test with non-existing userID
        userID.userID = 0
        expected_result = []
        result = CustomerController.get_order_basket(self.session, userID)
        self.assertEqual(result, expected_result)
    
    def test_update_favorite_order(self):
        # Update invoice isFavorite with existing data
        isFavorite = IsFavorite(invoiceID=1, isFavorite=True)
        result = CustomerController.update_favorite_order(self.session, isFavorite)
        self.assertEqual(isFavorite.invoiceID, result["invoiceID"])
        self.assertEqual(True, result["isFavorite"])

        # Check if it is updated in database
        updated_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.invoiceID == isFavorite.invoiceID).first()
        self.assertEqual(True, updated_invoice.isFavorite)

        # Update invoice isFavorite with non-existing data
        isFavorite = IsFavorite(invoiceID=0, isFavorite=True)
        result = CustomerController.update_favorite_order(self.session, isFavorite)
        self.assertEqual(None, result["invoiceID"])
    
    def test_update_order_status(self):
        # Update invoice status with existing data
        isFavorite = InvoiceStatus(invoiceID=1, status="CANCELLED")
        result = CustomerController.update_order_status(self.session, isFavorite)
        self.assertEqual(isFavorite.invoiceID, result["invoiceID"])
        self.assertEqual("CANCELLED", result["status"])

        # Check if it is updated in database
        updated_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.invoiceID == isFavorite.invoiceID).first()
        self.assertEqual("CANCELLED", updated_invoice.status)

        # Update invoice status with non-existing data
        isFavorite = InvoiceStatus(invoiceID=0, status="CANCELLED")
        result = CustomerController.update_order_status(self.session, isFavorite)
        self.assertEqual(None, result["invoiceID"])

    def test_delete_order(self):
        # Delete invoice with existing data
        invoiceID = InvoiceID(invoiceID=1)
        result = CustomerController.delete_order(self.session, invoiceID)
        self.assertEqual(invoiceID.invoiceID, result["invoiceID"])

        # Check if it is updated in database
        updated_order = self.session.query(order.Order).filter(order.Order.invoiceID == invoiceID.invoiceID).all()
        updated_invoice = self.session.query(invoice.Invoice).filter(invoice.Invoice.invoiceID == invoiceID.invoiceID).first()
        self.assertEqual([], updated_order)
        self.assertEqual(None, updated_invoice)

        # Delete invoice with non-existing data
        invoiceID = InvoiceID(invoiceID=0)
        result = CustomerController.delete_order(self.session, invoiceID)
        self.assertEqual(invoiceID.invoiceID, result["invoiceID"])

    def test_get_all_vendor_profile(self):
        expected_result = self.session.query(vendor_profile.VendorProfile).all()
        result = CustomerController.get_all_vendor_profile(self.session)
        self.assertEqual(expected_result, result)