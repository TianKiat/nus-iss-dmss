"""added complaints table

Revision ID: da280a3a5918
Revises: 849d8388b0f8
Create Date: 2023-10-15 21:48:08.223456

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'da280a3a5918'
down_revision: Union[str, None] = '849d8388b0f8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('complaint',
    sa.Column('complaintID', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=100), nullable=False),
    sa.Column('comment', sa.String(length=100), nullable=False),
    sa.Column('userID', sa.Integer(), nullable=False),
    sa.Column('roleID', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=100), nullable=False),
    sa.Column('createdtime', sa.DateTime, nullable=False),
    sa.PrimaryKeyConstraint('complaintID'),
    sa.ForeignKeyConstraint(['userID'], ['user.userID'], ),
    sa.ForeignKeyConstraint(['roleID'], ['role.roleID'], ),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('complaint')
    # ### end Alembic commands ###
