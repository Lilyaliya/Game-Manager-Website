function DisplayImage(result) {
    if (result.files && result.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            $("#img").attr('src', e.target.result);
        }
        fileReader.readAsDataURL(result.files[0]);
    }
}