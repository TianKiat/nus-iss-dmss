from app.datasource.promotion_gateway import PromotionGateway


class PromotionService:
    def __init__(self):
        pass

    def get_promotion_verify(db, promoCode):
        return PromotionGateway.get_promotion_verify(db, promoCode)