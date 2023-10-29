from sqlalchemy import Column, String, Integer, Double, ForeignKey, UniqueConstraint
from app.models import Base
from app.models.invoice import Invoice

class Order(Base):
    __tablename__ = "order"

    orderID = Column(Integer, primary_key=True)
    menuItemID = Column(Integer, nullable=False)
    foodName = Column(String(50), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Double, nullable=False)
    invoiceID = Column(Integer, ForeignKey(Invoice.invoiceID), nullable=False)

    __table_args__ = tuple(UniqueConstraint(invoiceID, menuItemID))