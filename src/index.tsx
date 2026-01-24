import React, {StrictMode, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Box, Cpu, Disc, HardDrive, MemoryStick, Moon, Search, Sun} from 'lucide-react';
import {Autocomplete, InputLabel, MenuItem, Select} from '@mui/material';
import SpecificationRow from './specification';
import {Image, IMAGES} from './image.tsx';
import {StyledButton, StyledFormControl, StyledTextField} from './views.tsx';
import './index.css';
import * as SimpleIcons from 'simple-icons';
import {SimpleIcon} from 'simple-icons';

const TYPE_COLORS: Record<string, string> = {
  'LXC': 'bg-green-500',
  'VM': 'bg-amber-400',
};

function getIconStyles(darkMode: boolean): string {
  return `w-5 h-5
   ${darkMode
    ? 'text-orange-500'
    : 'text-orange-700'
  }`
}

function getH2Styles(darkMode: boolean): string {
  return `text-xl font-bold
    ${darkMode
    ? 'text-white'
    : 'text-slate-900'
  }`;
}

function getClickableClass(darkMode: boolean): string {
  return `font-medium
  ${darkMode
    ? 'text-orange-500 hover:text-orange-400'
    : 'text-orange-700 hover:text-orange-800'
  }`;
}

const PvePlanner: React.FC = () => {
  const [images, setImages] = useState<Image[]>([])
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [image, setImage] = useState('');
  const [cpuAllocation, setCpuAllocation] = useState(1);
  const [ramAllocation, setRamAllocation] = useState(256);
  const [diskAllocation, setDiskAllocation] = useState(512);

  const getTypeColor = (type: string): string => {
    return TYPE_COLORS[type] || 'bg-gray-500';
  };

  const getSimpleIcon = (image: Image): SimpleIcon => {
    return (SimpleIcons as Record<string, SimpleIcon>)[
        `si${image.id.charAt(0).toUpperCase()}${image.id.slice(1)}`]
      || null;
  }

  return (
    <div
      className={
        `min-h-screen
        ${darkMode
          ? 'bg-linear-to-br from-slate-900 to-slate-800'
          : 'bg-linear-to-br from-slate-50 to-slate-100'
        }`
      }>
      <header
        className={
          `${darkMode
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white/80 border-slate-200'
          } sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300`
        }>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center gap-x-6 gap-y-3'>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={
                `p-3
                ${
                  darkMode
                    ? 'bg-orange-500 hover:bg-orange-400'
                    : 'bg-orange-700 hover:bg-orange-800'
                }
                rounded-xl
                transition-colors`
              }>
              {
                darkMode
                  ? <Sun className='w-8 h-8 text-white'/>
                  : <Moon className='w-8 h-8 text-white'/>
              }
            </button>
            <div>
              <h1
                className={
                  `text-4xl font-bold
                  ${darkMode
                    ? 'text-white'
                    : 'text-slate-900'}`
                }>
                PVE Planner
              </h1>
              <p
                className={
                  `${darkMode
                    ? 'text-slate-400'
                    : 'text-slate-600'
                  } mt-1`
                }>
                Proxmox resources calculator using <a
                className={getClickableClass(darkMode)}
                href='https://community-scripts.github.io/ProxmoxVE/'>
                community scripts
              </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* System */}
        <div
          className={
            `${darkMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200'
            } rounded-2xl shadow-lg border p-6 mb-8`
          }>
          <div className='flex items-center gap-2 mb-6'>
            <Disc className={getIconStyles(darkMode)}/>
            <h2 className={getH2Styles(darkMode)}>Image</h2>
          </div>

          <div className='mt-10 grid grid-cols-1 md:grid-cols-1'>
            <Autocomplete
              options={IMAGES.map(image => `${image.name} ${image.type}`)}
              value={image}
              onChange={(_, value) => {
                if (!value) {
                  return;
                }
                const img = IMAGES.find(img => `${img.name} ${img.type}` === value);
                if (img === undefined) {
                  return;
                }
                setImage(value);
                setCpuAllocation(img.cpu);
                setRamAllocation(img.ram);
                setDiskAllocation(img.disk);
              }}
              renderInput={params => (
                <StyledTextField
                  {...params}
                  darkMode={darkMode}
                  className='w-full rounded-xl transition-all'
                  label='Search LXC or VM'
                  placeholder='Search LXC or VM'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <Search
                        size={20}
                        className={`ml-2 mr-2 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}/>
                    ),
                    endAdornment: (<>{params.InputProps.endAdornment}</>),
                  }}
                />
              )}/>
          </div>

          <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='relative'>
              <StyledFormControl darkMode={darkMode} fullWidth>
                <InputLabel id='label-cpu-allocation'>CPU</InputLabel>
                <Select
                  className='w-full rounded-xl transition-all'
                  labelId='label-cpu-allocation'
                  id='select-cpu-allocation'
                  value={cpuAllocation}
                  label='CPU'
                  onChange={e => setCpuAllocation(e.target.value as number)}
                  startAdornment={
                    <Cpu
                      size={20}
                      className={`ml-2 mr-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}/>
                  }>
                  <MenuItem value={1}>1 vCPU</MenuItem>
                  <MenuItem value={2}>2 vCPU</MenuItem>
                  <MenuItem value={4}>4 vCPU</MenuItem>
                </Select>
              </StyledFormControl>
            </div>

            <div className='relative'>
              <StyledFormControl darkMode={darkMode} fullWidth>
                <InputLabel id='label-ram-allocation'>RAM</InputLabel>
                <Select
                  className='w-full rounded-xl transition-all'
                  labelId='label-ram-allocation'
                  id='select-ram-allocation'
                  value={ramAllocation}
                  label='RAM'
                  onChange={e => setRamAllocation(e.target.value as number)}
                  startAdornment={
                    <MemoryStick
                      size={20}
                      className={`ml-2 mr-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}/>
                  }>
                  <MenuItem value={256}>256 MB</MenuItem>
                  <MenuItem value={512}>512 MB</MenuItem>
                  <MenuItem value={1024}>1 GB</MenuItem>
                  <MenuItem value={2048}>2 GB</MenuItem>
                  <MenuItem value={4096}>4 GB</MenuItem>
                  <MenuItem value={6144}>6 GB</MenuItem>
                  <MenuItem value={8192}>8 GB</MenuItem>
                  <MenuItem value={10240}>10 GB</MenuItem>
                </Select>
              </StyledFormControl>
            </div>

            <div className='relative'>
              <StyledFormControl darkMode={darkMode} fullWidth>
                <InputLabel id='label-disk-allocation'>Disk</InputLabel>
                <Select
                  className='w-full rounded-xl transition-all'
                  labelId='label-disk-allocation'
                  id='select-disk-allocation'
                  value={diskAllocation}
                  label='Disk'
                  onChange={e => setDiskAllocation(e.target.value as number)}
                  startAdornment={
                    <HardDrive
                      size={20}
                      className={`ml-2 mr-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}/>
                  }>
                  <MenuItem value={512}>512 MB</MenuItem>
                  <MenuItem value={1024}>1 GB</MenuItem>
                  <MenuItem value={2048}>2 GB</MenuItem>
                  <MenuItem value={3072}>3 GB</MenuItem>
                  <MenuItem value={4096}>4 GB</MenuItem>
                  <MenuItem value={5120}>5 GB</MenuItem>
                  <MenuItem value={6144}>6 GB</MenuItem>
                  <MenuItem value={7168}>7 GB</MenuItem>
                  <MenuItem value={8192}>8 GB</MenuItem>
                  <MenuItem value={10240}>10 GB</MenuItem>
                  <MenuItem value={12288}>12 GB</MenuItem>
                  <MenuItem value={15360}>15 GB</MenuItem>
                  <MenuItem value={16384}>16 GB</MenuItem>
                  <MenuItem value={18432}>18 GB</MenuItem>
                  <MenuItem value={20480}>20 GB</MenuItem>
                  <MenuItem value={25600}>25 GB</MenuItem>
                  <MenuItem value={30720}>30 GB</MenuItem>
                  <MenuItem value={32768}>32 GB</MenuItem>
                </Select>
              </StyledFormControl>
            </div>
          </div>

          {/* Button */}
          <div className='mt-6 grid grid-cols-1 md:grid-cols-1'>
            <StyledButton
              fullWidth
              darkMode={darkMode}
              className='rounded-xl'
              variant='contained'
              disabled={!image}
              onClick={() => {
                const selectedImage = IMAGES.find(img => `${img.name} ${img.type}` === image);
                if (!selectedImage) {
                  return;
                }
                setImages([
                    ...images,
                    {
                      id: selectedImage.id,
                      name: selectedImage.name,
                      type: selectedImage.type,
                      cpu: cpuAllocation,
                      ram: ramAllocation,
                      disk: diskAllocation,
                    },
                  ]
                );
              }}>
              Add
            </StyledButton>
          </div>

          {/* Resources Allocation */}
          <div
            className={
              `mt-6 pt-6 border-t
              ${darkMode
                ? 'border-slate-700'
                : 'border-slate-200'
              }`
            }>
            <p
              className={
                `text-sm
                ${darkMode
                  ? 'text-slate-400'
                  : 'text-slate-600'
                }`
              }>
              <span
                className={
                  `font-semibold
                  ${darkMode
                    ? 'text-white'
                    : 'text-slate-900'
                  }`
                }>
                {images.reduce((sum, img) => sum + img.cpu, 0)}
              </span> vCPU, <span
              className={
                `font-semibold
                  ${darkMode
                  ? 'text-white'
                  : 'text-slate-900'
                }`
              }>
                {images.reduce((sum, img) => sum + img.ram, 0) / 1024} GB
              </span> RAM, <span
              className={
                `font-semibold
                  ${darkMode
                  ? 'text-white'
                  : 'text-slate-900'
                }`
              }>
                {images.reduce((sum, img) => sum + img.disk, 0) / 1024} GB
              </span> Disk
            </p>
          </div>
        </div>

        {/* Products Grid - 2x2 Landscape Cards */}
        {
          images.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {
                images.map((image, i) => {
                  const icon = getSimpleIcon(image);
                  return (
                    <div
                      key={`${image.name}-${i}`}
                      onClick={() => setImages(images.filter((_, index) => index !== i))}
                      className={
                        `${darkMode
                          ? 'bg-slate-900 border-slate-700'
                          : 'bg-white border-slate-200'
                        }
                        rounded-2xl
                        shadow-lg
                        border
                        overflow-hidden
                        hover:shadow-xl
                        transition-all
                        hover:-translate-y-1
                        cursor-pointer`
                      }>
                      <div className='flex'>
                        {/* Product Image Placeholder - Square on Left */}
                        <div
                          className='
                          bg-linear-to-br
                          from-slate-100
                          to-slate-200
                          w-48
                          h-48
                          flex
                          items-center
                          justify-center
                          shrink-0
                          relative
                          overflow-hidden'>
                          {
                            icon ? (
                              <svg
                                role='img'
                                viewBox='0 0 24 24'
                                fill={`#${icon.hex}`}
                                className='w-24 h-24'
                                xmlns='http://www.w3.org/2000/svg'>
                                <title>{image.name}</title>
                                <path d={icon.path}/>
                              </svg>
                            ) : (
                              <div className='text-center'>
                                <Box className='w-12 h-12 text-slate-400 mx-auto mb-2'/>
                                <p className='text-xs text-slate-500 font-medium'>No Icon</p>
                              </div>
                            )
                          }
                        </div>

                        {/* Right Side Content */}
                        <div className='flex-1 flex flex-col p-4'>
                          {/* Header with Tier and Price */}
                          <div className='flex items-start justify-between mb-2'>
                            <h3
                              className={
                                `text-base font-bold
                                ${darkMode
                                  ? 'text-white group-hover:text-orange-400'
                                  : 'text-slate-900 group-hover:text-orange-800'
                                } mb-3 transition-colors`
                              }>
                              {image.name}
                            </h3>
                            <div
                              className={
                                `${getTypeColor(image.type)}
                                text-white
                                px-3
                                py-1
                                rounded-lg
                                font-bold
                                text-sm
                                shadow-md`
                              }>
                              {image.type}
                            </div>
                            {
                              /*
                              <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                ${product.price}
                              </div>
                              */
                            }
                          </div>

                          {/* Specifications */}
                          <div className='space-y-2 text-sm'>
                            <SpecificationRow
                              label='CPU'
                              value={`${image.cpu} vCPU`}
                              darkMode={darkMode}/>
                            <SpecificationRow
                              label='RAM'
                              value={image.ram < 1024 ? `${image.ram} MB` : `${image.ram / 1024} GB`}
                              darkMode={darkMode}/>
                            <SpecificationRow
                              label='Disk'
                              value={image.disk < 1024 ? `${image.disk} MB` : `${image.disk / 1024} GB`}
                              darkMode={darkMode}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          ) : (
            <div
              className={
                `${darkMode
                  ? 'bg-slate-900 border-slate-700'
                  : 'bg-white border-slate-200'
                } rounded-2xl shadow-lg border p-12 text-center`
              }>
              <div className='max-w-md mx-auto'>
                <div
                  className={
                    `w-16 h-16
                    ${darkMode
                      ? 'bg-slate-800'
                      : 'bg-slate-100'
                    } rounded-full flex items-center justify-center mx-auto mb-4`
                  }>
                  <Search className='w-8 h-8 text-slate-400'/>
                </div>
                <h3
                  className={
                    `text-xl font-bold
                    ${darkMode
                      ? 'text-white'
                      : 'text-slate-900'
                    } mb-2`
                  }>
                  No images registered
                </h3>
                <p
                  className={
                    `${darkMode
                      ? 'text-slate-400'
                      : 'text-slate-600'
                    } mb-6`
                  }>
                  Find LXC or VM images and adjust the resources allocation.
                </p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PvePlanner;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PvePlanner/>
  </StrictMode>
);
