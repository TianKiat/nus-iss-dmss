"""empty message

Revision ID: 823f9bce1fe6
Revises: 891e186a2891, c8e2fef67180
Create Date: 2023-10-15 22:24:00.268685

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '823f9bce1fe6'
down_revision: Union[str, None] = ('891e186a2891', 'c8e2fef67180')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
