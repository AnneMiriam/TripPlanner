"""Added occasion column to trips

Revision ID: 350b1a985fbc
Revises: acb80d05fde2
Create Date: 2024-01-23 11:51:42.850817

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '350b1a985fbc'
down_revision = 'acb80d05fde2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.add_column(sa.Column('occasion', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.drop_column('occasion')

    # ### end Alembic commands ###
