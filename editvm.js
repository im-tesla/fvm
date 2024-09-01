function getVmfromURL() {
    var url = window.location.href;
    var vmName = url.substring(url.indexOf('?') + 1);
    vmName = vmName.replace(/%20/g, " ");
    return vmName;
}

function deleteVm() {
    var vmName = getVmfromURL();
    var vms = JSON.parse(localStorage.getItem('vms')) || [];
    vms = vms.filter(vm => vm.name !== vmName);
    localStorage.setItem('vms', JSON.stringify(vms));
    location.href = '/';
}

document.addEventListener('DOMContentLoaded', function() {
    var vmName = getVmfromURL();
    var vmNameElement = document.querySelector('.vm-name');
    vmNameElement.innerHTML = vmName;
});