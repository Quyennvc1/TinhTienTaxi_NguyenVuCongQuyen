var phi = {
    uberX: {
        1: 8000,
        20: 12000,
        21: 10000,
        thoiGianCho: 2000
    },
    uberSUV: {
        1: 9000,
        20: 14000,
        21: 12000,
        thoiGianCho: 3000
    },
    uberBlack: {
        1: 10000,
        20: 16000,
        21: 14000,
        thoiGianCho: 4000
    },

}

var btnTinhTien = document.getElementById('tinhTien');
var divThanhTien = document.getElementById('divThanhTien');

function validateNum(num) {
    return !isNaN(num) && (num.indexOf('-')<0) ? true : false;
}

function validate(soKM, thoiGianCho) {
    if(!validateNum(soKM) || soKM == '' || soKM == 0) {
        alert('Số KM không hợp lệ');
        document.getElementById('soKM').value='';
        document.getElementById('soKM').focus();
        return false;
    } else if(!validateNum(thoiGianCho)) {
        document.getElementById('thoiGianCho').value='';
        document.getElementById('thoiGianCho').focus();
        alert('Thời gian chờ không hợp lệ');
        return false;
    }
    return true;
}

function tinhTien(loaiXe, soKM, thoiGianCho) {
    var loaiPhi = phi[loaiXe];
    tienCho = thoiGianCho*loaiPhi['thoiGianCho'];
    if(soKM <= 1) {
        return loaiPhi[1] + tienCho;
    } else {
        return soKM <= 20 ? tienCho + soKM*loaiPhi['20'] : tienCho + 20*loaiPhi['20'] + (soKM-20)*loaiPhi['20'];
    }
}

btnTinhTien.onclick = btnTinhTienClick;
function btnTinhTienClick() {
    var soKM = document.getElementById('soKM').value;
    var thoiGianCho = document.getElementById('thoiGianCho').value;
    if(!validate(soKM, thoiGianCho)) {
        return false;
    }
    var loaiXe = document.querySelector('input[type=radio]:checked').getAttribute('id');
    var xuatTien = document.getElementById('xuatTien');
    var tongTien = tinhTien(loaiXe, soKM, thoiGianCho);
    divThanhTien.style.display = 'block';
    xuatTien.innerHTML = tongTien;
    return tongTien;
}

document.getElementById('inHoaDon').onclick = function() {
    var tongTien = 0;
    document.getElementById('hdSoKM').innerHTML = '0';
    document.getElementById('hdThoiGianCho').innerHTML = '0';
    document.getElementById('hdLoaiXe').innerHTML = '';
    document.getElementById('hdThanhTien').innerHTML = '0';
    if(tongTien = btnTinhTienClick()) {
        var soKM = document.getElementById('soKM').value;
        var thoiGianCho = document.getElementById('thoiGianCho').value;
        var loaiXe = document.querySelector('input[type=radio]:checked+label').innerHTML;
        document.getElementById('hdSoKM').innerHTML = soKM ? soKM : '0';
        document.getElementById('hdThoiGianCho').innerHTML = thoiGianCho ? thoiGianCho : '0';
        document.getElementById('hdLoaiXe').innerHTML = loaiXe;
        document.getElementById('hdThanhTien').innerHTML = tongTien;
    } else {
        document.querySelector('.modal-footer>button').click();
    }
}

document.getElementById('soKM').onkeydown = function(e) {
    document.getElementById('warningSoKM').innerHTML = "";
    setTimeout(function() {
        if(!validateNum(e.target.value)) {
            document.getElementById('warningSoKM').innerHTML = 'Số KM không hợp lệ';
        }
    },500);
}

document.getElementById('thoiGianCho').onkeydown = function(e) {
    document.getElementById('warningThoiGianCho').innerHTML = "";
    setTimeout(function() {
        if(!validateNum(e.target.value)) {
            document.getElementById('warningThoiGianCho').innerHTML = 'Thời gian chờ không hợp lệ';
        }
    },500);
}