# Generated by Django 4.1.7 on 2023-05-10 08:23

import django.db.models.deletion
import simple_history.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('logistic', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Records',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price_camp',
                 models.DecimalField(decimal_places=2, default=0, max_digits=4, verbose_name='Precio Campo')),
                ('freight', models.DecimalField(blank=True, decimal_places=4, default=0, max_digits=9, null=True,
                                                verbose_name='Flete')),
                ('lot', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='record',
                                             to='logistic.lot', verbose_name='Lote')),
            ],
            options={
                'verbose_name': 'Registro Materia Prima',
                'verbose_name_plural': 'Registro de Materia Prima',
                'ordering': ['-lot__entry_date'],
            },
        ),
        migrations.CreateModel(
            name='IndicatorKPIPineapple',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(unique=True, verbose_name='Fecha de ingreso')),
                ('projected_kg', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True,
                                                     verbose_name='Ingreso proyectado')),
                ('price_objective',
                 models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=7, null=True,
                                     verbose_name='Precio objetivo')),
                ('lots', models.ManyToManyField(blank=True, to='logistic.lot', verbose_name='Lotes')),
            ],
            options={
                'verbose_name': 'Indicador de Piña',
                'verbose_name_plural': 'Indicador de Piña',
            },
        ),
        migrations.CreateModel(
            name='IndicatorKPIMango',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(unique=True, verbose_name='Fecha de ingreso')),
                ('projected_kg', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True,
                                                     verbose_name='Ingreso proyectado')),
                ('price_objective',
                 models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=7, null=True,
                                     verbose_name='Precio objetivo')),
                ('lots', models.ManyToManyField(blank=True, to='logistic.lot', verbose_name='Lotes')),
            ],
            options={
                'verbose_name': 'Indicador de Mango',
                'verbose_name_plural': 'Indicador de Mango',
            },
        ),
        migrations.CreateModel(
            name='IndicatorKPIAguaymanto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(unique=True, verbose_name='Fecha de ingreso')),
                ('projected_kg', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True,
                                                     verbose_name='Ingreso proyectado')),
                ('price_objective',
                 models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=7, null=True,
                                     verbose_name='Precio objetivo')),
                ('lots', models.ManyToManyField(blank=True, to='logistic.lot', verbose_name='Lotes')),
            ],
            options={
                'verbose_name': 'Indicador de Aguaymanto',
                'verbose_name_plural': 'Indicador de Aguaymanto',
            },
        ),
        migrations.CreateModel(
            name='HistoricalRecords',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('price_camp',
                 models.DecimalField(decimal_places=2, default=0, max_digits=4, verbose_name='Precio Campo')),
                ('freight', models.DecimalField(blank=True, decimal_places=4, default=0, max_digits=9, null=True,
                                                verbose_name='Flete')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type',
                 models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user',
                 models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+',
                                   to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True,
                                          on_delete=django.db.models.deletion.DO_NOTHING, related_name='+',
                                          to='logistic.lot', verbose_name='Lote')),
            ],
            options={
                'verbose_name': 'historical Registro Materia Prima',
                'verbose_name_plural': 'historical Registro de Materia Prima',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]