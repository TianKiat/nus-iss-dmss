from sqlalchemy.orm import Session
from app.models.promotion import Promotion
from sqlalchemy import and_, delete

class PromotionGateway:
    def __init__():
        pass

    def get_promotion_verify(db: Session, vendorProfileID: int, promoCode: str):
        try:
            return db.query(Promotion).filter(
                Promotion.vendorProfileID == vendorProfileID,
                Promotion.promoCode == promoCode.upper(),
                Promotion.isValid
            ).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_promotions_for_vendor(db: Session, vendorProfileID: int):
        try:
            return db.query(Promotion).filter(Promotion.vendorProfileID == vendorProfileID, Promotion.isValid).all()
        except Exception as e:
            print(f"Error: {e}")

    def create_promotion_for_vendor(db: Session, promotion: Promotion):
        try:
            item_data = {
                'promoCode' : promotion.promoCode,
                'discount' : promotion.discount,
                'discountType' : promotion.discountType,
                'minimumSpending' : promotion.minimumSpending,
                'isValid' : True,
                'vendorProfileID' : promotion.vendorProfileID,
            }
            item_table = Promotion(**item_data)
            db.add(item_table)
            db.commit()
            item_new = db.query(Promotion).filter(and_(Promotion.promoCode == promotion.promoCode, Promotion.vendorProfileID == Promotion.vendorProfileID)).first()
            return {"id" : item_new.promotionID}

        except Exception as e:
            print(f"Error: {e}")
    def delete_promotion_for_vendor(db: Session, promotionId: int):
        try:
            itemToUpdate = db.query(Promotion).filter(Promotion.promotionID == promotionId).first()
            if itemToUpdate:
                db.execute(
                delete(Promotion)
                .where(Promotion.promotionID == promotionId)
                )
                db.commit()

            return {"id" : promotionId}

        except Exception as e:
            print(f"Error: {e}")