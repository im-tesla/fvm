const setupCpuRamModal = document.getElementById('setup_cpu_ram');
const setupDiskModal = document.getElementById('setup_disk');
const reviewModal = document.getElementById('review');

let vmDetails = {
    name: "New VM 1",
    ram: 1,
    cpuCores: 1,
    diskSpace: 1,
    diskType: "qcow2",
};

function getVmImageSrc(vmName) {
    vmName = vmName.toLowerCase();
    if (vmName.includes('arch')) return 'assets/arch.webp';
    if (vmName.includes('debian')) return 'assets/debian.png';
    if (vmName.includes('fedora')) return 'assets/fedora.png';
    if (vmName.includes('kali')) return 'assets/kali.png';
    if (vmName.includes('pop')) return 'assets/pop.png';
    if (vmName.includes('ubuntu')) return 'assets/ubuntu.png';
    return 'assets/ping.png';
}

function updateVmDetails() {
    const cpuRamRanges = document.querySelectorAll('#setup_cpu_ram input[type="range"]');

    vmDetails.name = document.querySelector('#setup_cpu_ram input[type="text"]').value;
    vmDetails.ram = cpuRamRanges[0].value;
    vmDetails.cpuCores = cpuRamRanges[1].value;
    vmDetails.diskSpace = document.querySelector('#setup_disk input[type="range"]').value;
    vmDetails.diskType = document.querySelector('#setup_disk select').value;
}

function populateReviewModal() {
    document.querySelector('#review input[value="New VM 1"]').value = vmDetails.name;
    document.querySelector('#review input[value="4GB"]').value = `${vmDetails.ram}GB`;
    document.querySelector('#review input[value="2"]').value = vmDetails.cpuCores;
    document.querySelector('#review input[value="100GB"]').value = `${vmDetails.diskSpace}GB`;
    document.querySelector('#review input[value="qcow2"]').value = vmDetails.diskType;
}

function saveVmToLocalStorage(vm) {
    let vms = JSON.parse(localStorage.getItem('vms')) || [];
    vms.push(vm);
    localStorage.setItem('vms', JSON.stringify(vms));
}

function loadVms() {
    const vms = JSON.parse(localStorage.getItem('vms')) || [];
    const vmsContainer = document.querySelector('.grid.grid-cols-2.gap-3');
    const noVmsText = document.querySelector('.grid.grid-cols-2.gap-3 h1');

    if (vms.length > 0) {
        noVmsText.style.display = 'none';

        vms.forEach(vm => {
            const vmElement = document.createElement('div');
            vmElement.classList.add('w-full', 'p-2', 'bg-base-100', 'rounded-lg', 'cursor-pointer');
            vmElement.innerHTML = `
                <div class="flex items-center p-1" onclick="location.href = '/editvm.html?${vm.name}'">
                    <img src="${getVmImageSrc(vm.name)}" class="h-8 mr-2">
                    <div>
                        <h1 class="font-semibold">${vm.name}</h1>
                        <p class="font-medium text-gray-500 text-sm">Stopped</p>
                    </div>
                </div>
            `;
            vmsContainer.appendChild(vmElement);
        });
    } else {
        noVmsText.style.display = 'block';
    }
}

document.querySelector('#setup_cpu_ram .modal-action button.btn').onclick = function () {
    updateVmDetails();
    setupCpuRamModal.close();
    setupDiskModal.showModal();
};

document.querySelector('#setup_disk .modal-action button.btn:nth-of-type(2)').onclick = function () {
    updateVmDetails();
    setupDiskModal.close();
    populateReviewModal();
    reviewModal.showModal();
};

document.querySelector('#review .modal-action button.btn:nth-of-type(2)').onclick = function () {
    console.log('Creating VM with details:', vmDetails);

    saveVmToLocalStorage(vmDetails);

    vmDetails = {
        name: "New VM 1",
        ram: 1,
        cpuCores: 1,
        diskSpace: 1,
        diskType: "qcow2",
    };

    reviewModal.close();
    location.reload();
};

document.querySelector('#setup_disk .modal-action button.btn:nth-of-type(1)').onclick = function () {
    setupDiskModal.close();
    setupCpuRamModal.showModal();
};

document.querySelector('#review .modal-action button.btn:nth-of-type(1)').onclick = function () {
    reviewModal.close();
    setupDiskModal.showModal();
};

document.addEventListener('DOMContentLoaded', loadVms);
