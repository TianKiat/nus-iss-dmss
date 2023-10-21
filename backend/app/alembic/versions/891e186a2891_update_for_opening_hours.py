"""update for opening hours

Revision ID: 891e186a2891
Revises: 849d8388b0f8
Create Date: 2023-10-15 20:11:32.866780

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '891e186a2891'
down_revision: Union[str, None] = '849d8388b0f8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        'openinghours',
        sa.Column('openingHoursID', sa.Integer(), nullable=False),
        sa.Column('vendorProfileID', sa.Integer(), sa.ForeignKey('vendor_profile.vendorProfileID'), nullable=False),
        sa.Column('day', sa.Integer(), nullable=True),
        sa.Column('openTime', sa.DateTime(), nullable=True),
        sa.Column('closingtTime', sa.DateTime(), nullable=True),
        sa.Column('isOpen', sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint('openingHoursID', name='openinghours_pk'),
        sa.UniqueConstraint('vendorProfileID', 'day', name='openinghours_vendor_day_uc')
    )

def downgrade():
    op.drop_table('openinghours')
