jQuery('#user-Form').on('submit', function (e) {
    var name = $('#staffname').val()
    var rate = $('#rate').val()
    var data = $('#days').serializeArray()
    obj = {};
    $.each(data, function () {
        obj[this.name] = this.value
    })
    finalObj = JSON.stringify({
        "name": name,
        "rate": rate,
        "timesheet": obj
    })
    e.preventDefault();
    $.ajax({
        url: '/userData',
        type: 'POST',
        contentType: 'application/json',
        data: finalObj,
        success: function (res) {
            e.preventDefault();

            $('#result').html("Result :" + JSON.stringify(res));
            // console.log("success",res)
        },
        failure: function (err) {
            console.log("error", err)
        }
    })

});
