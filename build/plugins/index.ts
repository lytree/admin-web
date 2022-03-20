import vue from './vue';
import html from './html';
import iconify from './iconify';
import windicss from './windicss';
import visualizer from './visualizer';
import mock from './mock';
import autoImport from './autoImport';

const plugins = [vue, ...html, ...iconify, autoImport, windicss, visualizer, mock];

export default plugins;
