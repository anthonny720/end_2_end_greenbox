# Generated by Django 4.1.7 on 2023-06-27 09:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('production', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nombre')),
                ('type', models.CharField(choices=[('V', 'Variable'), ('F', 'Fijo')], max_length=1, verbose_name='Tipo')),
                ('cost', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Costo')),
            ],
            options={
                'verbose_name': 'Tipo de costo',
                'verbose_name_plural': 'Tipo de costos',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='ReportCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cost', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True, verbose_name='Costo')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='report_category', to='finances.category', verbose_name='Categoría')),
            ],
            options={
                'verbose_name': 'Registro por tipo de costo',
                'verbose_name_plural': 'Registro por tipo de costo',
                'ordering': ['category__type'],
            },
        ),
        migrations.CreateModel(
            name='ReportCost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('item', models.ManyToManyField(related_name='reports', through='finances.ReportCategory', to='finances.category', verbose_name='Categoría')),
                ('mod', models.ManyToManyField(blank=True, null=True, related_name='reports', to='production.mod', verbose_name='MOD')),
            ],
            options={
                'verbose_name': 'Costos',
                'verbose_name_plural': 'Costos',
                'unique_together': {('date',)},
            },
        ),
        migrations.AddField(
            model_name='reportcategory',
            name='report',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='reports_category', to='finances.reportcost', verbose_name='Reporte'),
        ),
    ]