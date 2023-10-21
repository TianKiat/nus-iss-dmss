from app.datasource.promotion_gateway import PromotionGateway


class PromotionService:
    def __init__(self):
        pass

    def get_promotion_verify(db, vendorProfileID, promoCode):
        return PromotionGateway.get_promotion_verify(db, vendorProfileID, promoCode)
    
    def get_promotions_for_vendor(db, vendorProfileID : int):
        return PromotionGateway.get_promotions_for_vendor(db, vendorProfileID)
    
    def create_promotion_for_vendor(db, promotion):
        return PromotionGateway.create_promotion_for_vendor(db=db, promotion=promotion)
    
    def delete_promotion_for_vendor(db, promotionId):
        return PromotionGateway.delete_promotion_for_vendor(db=db, promotionId=promotionId)