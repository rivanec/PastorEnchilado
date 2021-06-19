$(document).ready(function () {
    
    alert('Hola Marco Uriel esto es una segunda prueba ');



    var tIngredientes = $('#tIngredientes').DataTable({
        //dom: 'lrtip',
        //searching: true,
        //lengthChange: false,
        //info: false,
        //select: false,
        //responsive: false,
        //pagingType: 'simple',
        //scrollY: "450px",
        //scrollCollapse: true,     
        columns: [


            {
                data: "IdSucursal", visible: false
                , render: function (data, type, row) {
                    var str = "<span><i class=' fa fa-phone'></i>";
                    if (row.IdSucursal > 0)
                        str += "<i style='margin-left:5px;' class='fa fa-arrow-circle-right'></i></span>";
                    else if (row.IdSucursal === 8)
                        str += "<i style='margin-left:5px;' class='fa fa-arrow-circle-left'></i></span>";
                    return str;
                }
            },
            {
                data: "TotalEmpleados", title: "Total lugares", render: function (data, type, row) {
                    return "<div class='input-group'><input style='width:100%' placeholder='Asignar Usuario' type='text' id='t" + row.IdSucursal + "' style='width:50%' class='TotalEmpleados form-control' value='" + row.TotalEmpleados + "'></div>";

                    //return data; //moment(data).format("DD-MM-YYYY");
                }
            },
            {
                data: "Fecha", title: "Fecha", render: function (data, type, row) {

                    return moment(data).format("DD-MM-YYYY");
                }
            },
            //{ data: "Sucursal" },

            {
                data: "Porcentaje", title: "Porcentaje",
                render: function (data, type, row) {
                    return "<div><input style='width:100%' placeholder='Asignar Cliente' type='text' id='p" + row.IdSucursal + "' style='width:50%' class='Porcentaje' value='" + row.Porcentaje + "' ></div>";
                }
            }




        ],
        drawCallback: function (settings) {
            $(".TotalEmpleados").on('change', function (e) {
                var id = this.id.replace('t', '');
                var Obj = {

                    TotalEmpleados: this.value,
                    IdSucursal: id
                };
                console.log(Obj)
                $.post(configuraApp.getWaTBBooking() + '/TBBOOKING_SUCURSALES_OCUPACION_Set_by_Day', Obj, function (data, status) {
                    //msgBox.guarda();
                    tiemposGlobal();
                    tTiemposMesBarra.ajax.url(configuraApp.getWaTBBooking() + "/GetByMonthBOOKING?Usuario=" + $("#txtusuario").val() + "&sucursal=" + $("#sSucursal").val()).load();

                });
            });

            $(".Porcentaje").on('change', function (e) {
                var id = this.id.replace('p', '');
                var Obj = {

                    Porcentaje: this.value,
                    IdSucursal: id
                };
                console.log(Obj)
                $.post(configuraApp.getWaTBBooking() + '/TBBOOKING_SUCURSALES_OCUPACION_Set_by_Day', Obj, function (data, status) {
                    //msgBox.guarda();
                    tiemposGlobal();
                    tTiemposMesBarra.ajax.url(configuraApp.getWaTBBooking() + "/GetByMonthBOOKING?Usuario=" + $("#txtusuario").val() + "&sucursal=" + $("#sSucursal").val()).load();

                });
            });

        },
        ajax: {

            url: "https://ad.s-s.mx/ApiLegalAdmin/api/WaTBBooking/" + "/Get_TBBOOKING_SUCURSALES_OCUPACION_Select_by_Month?Fecha=" + "2021-06-16" + "&sucursal=" + "CDMX",

            dataSrc: ""
        }
    });
})