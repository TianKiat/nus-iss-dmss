from sqlalchemy.orm import Session
from app.models.promotion import Promotion

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