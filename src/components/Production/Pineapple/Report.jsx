import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Logo from '../../../assets/logo.png'
import {useSelector} from "react-redux";
import {map, sumBy} from "lodash";
import Humanize from "humanize-plus";

const styles = StyleSheet.create({
    image: {
        width: 70, borderRadius: 10, padding: "2px",

    }, section: {
        display: "flex", justifyContent: "space-around", width: "100%",

        flexDirection: "row",

        borderBottom: "1px"
    }
});
const ReportViewer = () => {


    const data = useSelector(state => state.Production.process)

    const total_enabled = sumBy(data, item => Number(item?.enabled_kg));
    const total_process = sumBy(data, item => Number(item?.paid_kg));
    const enabled_1_8 = sumBy(data, item => Number(item?.enabled_1_8));
    const enabled_1_16 = sumBy(data, item => Number(item?.enabled_1_16));
    const enabled_rings = sumBy(data, item => Number(item?.enabled_rings));

    const header_table_1 = ['Lote', 'Kg recibido', '% Rechazo', 'Kg procesado', '% Corona', '% Tronco', '% Cáscara', '% Habilitado']
    const header_table_2 = ['Lote', 'Kg habilitado', 'Kg rings', 'Kg octavos', 'Kg tid bits',]
    const header_table_3 = ['Kg procesados', 'Participación octavos', 'Participación tid bits', 'Participación rings',]

    const RowTable = ({value, width}) => {
        return (<Text style={{
            fontSize: "8px",
            fontWeight: "extrabold",
            fontFamily: "Times-Roman",
            width: width,
            display: "block",
            paddingHorizontal: "12px",
            paddingVertical: "2px",
            borderWidth: "1px",
            textAlign: "center"

        }}>{value}</Text>)
    }

    data && data.length > 0 && <div>No hay contenido</div>


    return (<PDFViewer style={{width: "100%", height: "100%"}}>
        <Document>
            <Page size="A4" style={{padding: "12px", width: "100%"}}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    gap: "24px",
                }}>
                    <Image style={styles.image} src={Logo}/>
                    <Text style={{
                        fontSize: "18px", fontWeight: "extrabold", fontFamily: "Times-Roman",
                    }}>CUADRO RESUMEN DE PROCESO ACONDICIONADO</Text>
                </View>
                <View style={{
                    display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row"
                }}>
                    {map(header_table_1, (item, index) => {
                        return <RowTable width={"12.5%"} key={index} value={item}/>
                    })}
                </View>
                {map(data, (item, index) => {
                    return (<View key={index} style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <RowTable width={"12.5%"} value={item?.lot}/>
                        <RowTable width={"12.5%"} value={Humanize.formatNumber(item?.stock, 2)}/>
                        <RowTable width={"12.5%"} value={Humanize.formatNumber(item?.percent_rejected_ranch, 2) + "%"}/>
                        <RowTable width={"12.5%"} value={Humanize.formatNumber(item?.paid_kg, 2)}/>
                        <RowTable width={"12.5%"} value={Humanize.formatNumber(item?.percent_crown, 2) + "%"}/>
                        <RowTable width={"12.5%"} value={Humanize.formatNumber(item?.percent_trunk, 2) + "%"}/>
                        <RowTable width={"12.5%"} value={Humanize.formatNumber(item?.percent_shell, 2) + "%"}/>
                        <RowTable width={"12.5%"} value={Humanize.formatNumber(item?.percent_enabled, 2) + "%"}/>

                    </View>)
                })}
                <View style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginTop: "12px"
                }}>
                    {map(header_table_2, (item, index) => {
                        return <RowTable width={"20%"} key={index} value={item}/>
                    })}
                </View>
                {data !== null && map(data, (item, index) => {
                    return (<View key={index} style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <RowTable width={"20%"} value={item?.lot}/>
                        <RowTable width={"20%"} value={Humanize.formatNumber(item.enabled_kg, 2)}/>
                        <RowTable width={"20%"} value={Humanize.formatNumber(item.enabled_rings, 2)}/>
                        <RowTable width={"20%"} value={Humanize.formatNumber(item.enabled_1_8, 2)}/>
                        <RowTable width={"20%"} value={Humanize.formatNumber(item.enabled_1_16, 2)}/>
                    </View>)
                })}
                <View style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginTop: "12px"
                }}>
                    {map(header_table_3, (item, index) => {
                        return <RowTable width={"25%"} key={index} value={item}/>
                    })}
                </View>
                <View style={{
                    display: "flex", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row"
                }}>

                    <RowTable width={"25%"} value={Humanize.formatNumber(total_process, 2)}/>
                    <RowTable width={"25%"}
                              value={Humanize.formatNumber((enabled_1_8 / total_enabled) * 100, 2) + '%'}/>
                    <RowTable width={"25%"}
                              value={Humanize.formatNumber((enabled_1_16 / total_enabled) * 100, 2) + '%'}/>
                    <RowTable width={"25%"}
                              value={Humanize.formatNumber((enabled_rings / total_enabled) * 100, 2) + '%'}/>

                </View>

            </Page>


        </Document>
    </PDFViewer>);
};

export default ReportViewer;
