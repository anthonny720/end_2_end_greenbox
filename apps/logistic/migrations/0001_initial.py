# Generated by Django 4.1.7 on 2023-06-27 09:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('collection', '0001_initial'),
        ('management', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Boxes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nombre')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Peso')),
            ],
            options={
                'verbose_name': 'Gestión de jaba',
                'verbose_name_plural': 'Gestión de jabas',
            },
        ),
        migrations.CreateModel(
            name='Lot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('carrier_guide', models.CharField(max_length=12, verbose_name='Guia de transporte')),
                ('provider_guide', models.CharField(max_length=12, verbose_name='Guia de proveedor')),
                ('drive', models.URLField(blank=True, verbose_name='Drive')),
                ('invoice', models.CharField(blank=True, max_length=100, null=True, verbose_name='Factura')),
                ('entry_date', models.DateTimeField(verbose_name='Fecha de entrada')),
                ('departure_date', models.DateTimeField(blank=True, null=True, verbose_name='Fecha de inicio de partida')),
                ('download_date', models.DateField(verbose_name='Fecha de descarga')),
                ('guide_weight', models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=11, null=True, verbose_name='Peso Guia')),
                ('condition', models.CharField(choices=[('O', 'Orgánico'), ('C', 'Convencional'), ('B', 'Biosuisse'), ('E', 'Endose'), ('J', 'Jas'), ('F', 'Fairtrade'), ('BF', 'Biosuisse/Fairtrade'), ('CF', 'Convencional/Fairtrade'), ('OB', 'Orgánico/Biosuisse'), ('OJ', 'Orgánico/Jas'), ('OBF', 'Orgánico/Biosuisse/Fairtrade'), ('OJF', 'Orgánico/Jas/Fairtrade')], default='C', max_length=12, verbose_name='Condición')),
                ('variety', models.CharField(blank=True, max_length=100, null=True, verbose_name='Variedad')),
                ('origin', models.CharField(blank=True, max_length=100, null=True, verbose_name='Origen')),
                ('lot', models.CharField(max_length=13, unique=True, verbose_name='Lote')),
                ('quality', models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=3, null=True, verbose_name='Muestra de Calidad')),
                ('description', models.TextField(blank=True, max_length=500, null=True, verbose_name='Descripción')),
                ('discount_description', models.TextField(blank=True, max_length=500, null=True, verbose_name='Descripción de Descuento')),
                ('discount', models.DecimalField(blank=True, decimal_places=10, default=0.0, max_digits=15, null=True, verbose_name='Porcentaje de Descuento Rechazo')),
                ('discount_price', models.DecimalField(blank=True, decimal_places=10, default=0.0, max_digits=15, null=True, verbose_name='Porcentaje de Descuento Precio')),
                ('discount_price_soles', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=4, null=True, verbose_name='Soles Descuento Precio')),
                ('merma', models.DecimalField(blank=True, decimal_places=3, default=0, editable=False, max_digits=11, null=True, verbose_name='Merma')),
                ('stock', models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=11, null=True)),
                ('closed', models.BooleanField(default=False, verbose_name='Cerrado/Abierto')),
                ('maquila', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='management.outsourcing', verbose_name='Packing')),
                ('parcel', models.ManyToManyField(blank=True, related_name='parcel_lot', to='collection.parcel', verbose_name='Parcelas')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='product_lot', to='collection.product', verbose_name='Producto')),
                ('provider', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='provider_lot', to='collection.provider', verbose_name='Proveedor')),
                ('transport', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='carrier_lot', to='management.transport', verbose_name='Empresa de transporte')),
            ],
            options={
                'verbose_name': 'Lote de Materia Prima',
                'verbose_name_plural': 'Lotes de Materia Prima',
                'ordering': ['-download_date'],
            },
        ),
        migrations.CreateModel(
            name='Pallets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nombre')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Peso')),
            ],
            options={
                'verbose_name': 'Gestión de pallet',
                'verbose_name_plural': 'Gestión de pallets',
            },
        ),
        migrations.CreateModel(
            name='Motions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100, verbose_name='Descripción')),
                ('quantity', models.IntegerField(verbose_name='Cantidad')),
                ('date', models.DateField(auto_now_add=True, verbose_name='Fecha')),
                ('destination', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='destination_kardex_boxes', to='management.location', verbose_name='Destino')),
                ('origin', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='origin_kardex_boxes', to='management.location', verbose_name='Origen')),
            ],
            options={
                'verbose_name': 'Movimiento de jabas',
                'verbose_name_plural': 'Movimiento de jabas',
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='ILot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(verbose_name='Numero de pallet')),
                ('weight', models.FloatField(default=0, verbose_name='Peso bruto')),
                ('gb', models.IntegerField(default=0, verbose_name='GreenBox')),
                ('pa', models.IntegerField(default=0, verbose_name='PAE')),
                ('co', models.IntegerField(default=0, verbose_name='Colores')),
                ('t0', models.IntegerField(default=0, verbose_name='Tibana 0')),
                ('t1', models.IntegerField(default=0, verbose_name='Tibana 1')),
                ('t2', models.IntegerField(default=0, verbose_name='Tibana 2')),
                ('gn', models.IntegerField(default=0, verbose_name='Gandules')),
                ('ma', models.IntegerField(default=0, verbose_name='Madera')),
                ('tare', models.FloatField(default=0, verbose_name='Tara')),
                ('c6', models.IntegerField(default=0, verbose_name='Calibre 6')),
                ('c8', models.IntegerField(default=0, verbose_name='Calibre 8')),
                ('c10', models.IntegerField(default=0, verbose_name='Calibre 10')),
                ('c12', models.IntegerField(default=0, verbose_name='Calibre 12')),
                ('c14', models.IntegerField(default=0, verbose_name='Calibre 14')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='i_lot', to='management.storagearea', verbose_name='Ubicación de almacenamiento')),
                ('lot', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='i_lot', to='logistic.lot', verbose_name='Lote')),
                ('pallet', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='pallets', to='logistic.pallets', verbose_name='Pallet')),
            ],
            options={
                'verbose_name': 'Información de Lotes',
                'verbose_name_plural': 'Información de Lotes',
                'ordering': ['number'],
                'unique_together': {('number', 'lot')},
            },
        ),
        migrations.CreateModel(
            name='HistoricalRegisterOutput',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now, verbose_name='Fecha de salida')),
                ('kg', models.FloatField(default=0, verbose_name='Kg')),
                ('net_weight', models.FloatField(default=0, verbose_name='Kg Neto')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('item', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.ilot', verbose_name='Item')),
            ],
            options={
                'verbose_name': 'historical Registro de Salidas',
                'verbose_name_plural': 'historical Registro de Salidas',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalPallets',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nombre')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Peso')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical Gestión de pallet',
                'verbose_name_plural': 'historical Gestión de pallets',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalOutput',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateField(blank=True, editable=False, verbose_name='Fecha de salida')),
                ('kg', models.FloatField(default=0, verbose_name='Kg')),
                ('destine', models.CharField(choices=[('P', 'Producción'), ('M', 'Merma')], default='P', max_length=1, verbose_name='Destino')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.lot', verbose_name='Lote')),
            ],
            options={
                'verbose_name': 'historical Salida de Lotes',
                'verbose_name_plural': 'historical Salidas de Lotes',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalMotions',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('description', models.CharField(max_length=100, verbose_name='Descripción')),
                ('quantity', models.IntegerField(verbose_name='Cantidad')),
                ('date', models.DateField(blank=True, editable=False, verbose_name='Fecha')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('destination', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='management.location', verbose_name='Destino')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('origin', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='management.location', verbose_name='Origen')),
            ],
            options={
                'verbose_name': 'historical Movimiento de jabas',
                'verbose_name_plural': 'historical Movimiento de jabas',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalLot',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('carrier_guide', models.CharField(max_length=12, verbose_name='Guia de transporte')),
                ('provider_guide', models.CharField(max_length=12, verbose_name='Guia de proveedor')),
                ('drive', models.URLField(blank=True, verbose_name='Drive')),
                ('invoice', models.CharField(blank=True, max_length=100, null=True, verbose_name='Factura')),
                ('entry_date', models.DateTimeField(verbose_name='Fecha de entrada')),
                ('departure_date', models.DateTimeField(blank=True, null=True, verbose_name='Fecha de inicio de partida')),
                ('download_date', models.DateField(verbose_name='Fecha de descarga')),
                ('guide_weight', models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=11, null=True, verbose_name='Peso Guia')),
                ('condition', models.CharField(choices=[('O', 'Orgánico'), ('C', 'Convencional'), ('B', 'Biosuisse'), ('E', 'Endose'), ('J', 'Jas'), ('F', 'Fairtrade'), ('BF', 'Biosuisse/Fairtrade'), ('CF', 'Convencional/Fairtrade'), ('OB', 'Orgánico/Biosuisse'), ('OJ', 'Orgánico/Jas'), ('OBF', 'Orgánico/Biosuisse/Fairtrade'), ('OJF', 'Orgánico/Jas/Fairtrade')], default='C', max_length=12, verbose_name='Condición')),
                ('variety', models.CharField(blank=True, max_length=100, null=True, verbose_name='Variedad')),
                ('origin', models.CharField(blank=True, max_length=100, null=True, verbose_name='Origen')),
                ('lot', models.CharField(db_index=True, max_length=13, verbose_name='Lote')),
                ('quality', models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=3, null=True, verbose_name='Muestra de Calidad')),
                ('description', models.TextField(blank=True, max_length=500, null=True, verbose_name='Descripción')),
                ('discount_description', models.TextField(blank=True, max_length=500, null=True, verbose_name='Descripción de Descuento')),
                ('discount', models.DecimalField(blank=True, decimal_places=10, default=0.0, max_digits=15, null=True, verbose_name='Porcentaje de Descuento Rechazo')),
                ('discount_price', models.DecimalField(blank=True, decimal_places=10, default=0.0, max_digits=15, null=True, verbose_name='Porcentaje de Descuento Precio')),
                ('discount_price_soles', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=4, null=True, verbose_name='Soles Descuento Precio')),
                ('merma', models.DecimalField(blank=True, decimal_places=3, default=0, editable=False, max_digits=11, null=True, verbose_name='Merma')),
                ('stock', models.DecimalField(blank=True, decimal_places=3, default=0, max_digits=11, null=True)),
                ('closed', models.BooleanField(default=False, verbose_name='Cerrado/Abierto')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('maquila', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='management.outsourcing', verbose_name='Packing')),
                ('product', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='collection.product', verbose_name='Producto')),
                ('provider', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='collection.provider', verbose_name='Proveedor')),
                ('transport', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='management.transport', verbose_name='Empresa de transporte')),
            ],
            options={
                'verbose_name': 'historical Lote de Materia Prima',
                'verbose_name_plural': 'historical Lotes de Materia Prima',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalILot',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('number', models.IntegerField(verbose_name='Numero de pallet')),
                ('weight', models.FloatField(default=0, verbose_name='Peso bruto')),
                ('gb', models.IntegerField(default=0, verbose_name='GreenBox')),
                ('pa', models.IntegerField(default=0, verbose_name='PAE')),
                ('co', models.IntegerField(default=0, verbose_name='Colores')),
                ('t0', models.IntegerField(default=0, verbose_name='Tibana 0')),
                ('t1', models.IntegerField(default=0, verbose_name='Tibana 1')),
                ('t2', models.IntegerField(default=0, verbose_name='Tibana 2')),
                ('gn', models.IntegerField(default=0, verbose_name='Gandules')),
                ('ma', models.IntegerField(default=0, verbose_name='Madera')),
                ('tare', models.FloatField(default=0, verbose_name='Tara')),
                ('c6', models.IntegerField(default=0, verbose_name='Calibre 6')),
                ('c8', models.IntegerField(default=0, verbose_name='Calibre 8')),
                ('c10', models.IntegerField(default=0, verbose_name='Calibre 10')),
                ('c12', models.IntegerField(default=0, verbose_name='Calibre 12')),
                ('c14', models.IntegerField(default=0, verbose_name='Calibre 14')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('location', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='management.storagearea', verbose_name='Ubicación de almacenamiento')),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.lot', verbose_name='Lote')),
                ('pallet', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.pallets', verbose_name='Pallet')),
            ],
            options={
                'verbose_name': 'historical Información de Lotes',
                'verbose_name_plural': 'historical Información de Lotes',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalBoxes',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nombre')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=4, verbose_name='Peso')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical Gestión de jaba',
                'verbose_name_plural': 'historical Gestión de jabas',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='RegisterOutput',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now, verbose_name='Fecha de salida')),
                ('kg', models.FloatField(default=0, verbose_name='Kg')),
                ('net_weight', models.FloatField(default=0, verbose_name='Kg Neto')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='item', to='logistic.ilot', verbose_name='Item')),
            ],
            options={
                'verbose_name': 'Registro de Salidas',
                'verbose_name_plural': 'Registro de Salidas',
                'ordering': ['date'],
                'unique_together': {('date', 'item')},
            },
        ),
        migrations.CreateModel(
            name='Output',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True, verbose_name='Fecha de salida')),
                ('kg', models.FloatField(default=0, verbose_name='Kg')),
                ('destine', models.CharField(choices=[('P', 'Producción'), ('M', 'Merma')], default='P', max_length=1, verbose_name='Destino')),
                ('lot', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='output', to='logistic.lot', verbose_name='Lote')),
            ],
            options={
                'verbose_name': 'Salida de Lotes',
                'verbose_name_plural': 'Salidas de Lotes',
                'ordering': ['date'],
                'unique_together': {('date', 'lot', 'destine')},
            },
        ),
    ]