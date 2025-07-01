from peewee import Model, PrimaryKeyField, CharField, IntegerField

class Cliente(Model):
    id = PrimaryKeyField()
    class Meta():
        database = 'multiclin'