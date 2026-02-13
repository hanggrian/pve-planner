# TODO variants of image should use the same logo:
#   - replace `debian` with `docker` for "Docker VM"
#   - replace `pimoxhaos` with `homeassistant`
#   - replace `omv` with `openmediavault`
#   - replace `turnkeynextcloud` with `nextcloud`
#   - replace `umbrelos` with `umbrel`
#   - replace all `alpine{app}` with `alpinelinux`
#   - replace `alpine` with `alpinelinux`
#   - remove duplicate `scanopy` from netvisor.sh

from json import dump
from pathlib import Path
from re import search, sub

from colorama import Fore, Style
from requests import get

VM_ID_REGEX: str = r'(?<=var_os=")([^"]+)'
VM_NAME_REGEX: str = r'(?<=--title ")([^"]+)'
VM_CPU_REGEX: str = r'(?<=CORE_COUNT=")([^"]+)'
VM_RAM_REGEX: str = r'(?<=RAM_SIZE=")([^"]+)'
VM_DISK_REGEX: str = r'(?<=DISK_SIZE=")([^"]+)'

LXC_NAME_REGEX: str = r'(?<=APP=")([^"]+)'
LXC_CPU_REGEX: str = r'(?<=var_cpu="\$\{var_cpu:-)(\d+)'
LXC_RAM_REGEX: str = r'(?<=var_ram="\$\{var_ram:-)(\d+)'
LXC_DISK_REGEX: str = r'(?<=var_disk="\$\{var_disk:-)(\d+)'

OUTPUT_FILE = 'src/images.json'


def list_files(path: str) -> list[str]:
    response = \
        get(
            url=f'https://api.github.com/repos/community-scripts/ProxmoxVE/contents/{path}',
            timeout=6,
        )
    if response.status_code != 200:
        raise IOError('Failed to fetch.')

    items = []
    for item in response.json():
        if item['type'] == 'file' and Path(item['name']).suffix == '.sh':
            items.append(item['name'])
    return items


def read_raw_file(path: str) -> str:
    response = \
        get(
            f'https://github.com/community-scripts/ProxmoxVE/raw/main/{path}',
            timeout=3,
        )
    if response.status_code != 200:
        raise IOError('Failed to fetch.')
    return response.text


def format_id(name2: str) -> str:
    return sub(r'[^a-zA-Z0-9]+', '', name2).strip('_').lower()


if __name__ == '__main__':
    result = []

    print(f'{Fore.YELLOW}Reading GitHub...{Style.RESET_ALL}')

    print('- VM')
    for file in list_files('vm'):
        source = read_raw_file(f'vm/{file}')
        name = search(VM_NAME_REGEX, source).group(1).split(' VM')[0]
        print(f'  - {name}')

        disk_match = search(VM_DISK_REGEX, source)
        if not disk_match:
            disk = 512
        else:
            disk_str = disk_match.group(1)
            disk = \
                int(disk_str) \
                    if 'G' not in disk_str \
                    else int(disk_str.split('G')[0]) * 1024

        result.append({
            'id': format_id(search(VM_ID_REGEX, source).group(1)),
            'name': name,
            'type': 'VM',
            'cpu': int(search(VM_CPU_REGEX, source).group(1)),
            'ram': int(search(VM_RAM_REGEX, source).group(1)),
            'disk': disk,
        })

    print('- LXC')
    for file in list_files('ct'):
        source = read_raw_file(f'ct/{file}')
        name = search(LXC_NAME_REGEX, source).group(1)
        print(f'  - {name}')

        result.append({
            'id': format_id(name),
            'name': name,
            'type': 'LXC',
            'cpu': int(search(LXC_CPU_REGEX, source).group(1)),
            'ram': int(search(LXC_RAM_REGEX, source).group(1)),
            'disk': int(search(LXC_DISK_REGEX, source).group(1)) * 1024,
        })

    with open(OUTPUT_FILE, 'w', encoding='UTF-8') as file:
        dump(result, file, indent=2)
    print(f'{Fore.GREEN}Done.{Style.RESET_ALL}')

    print()
    print('Goodbye!')
