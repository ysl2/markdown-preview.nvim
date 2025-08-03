
const fs = require('fs');
const path = require('path');

const createStandalonePlugin = (markdownFilePath) => {
  const defaultConfig = {
    mkdp_auto_start: 0,
    mkdp_auto_close: 1,
    mkdp_refresh_slow: 0,
    mkdp_command_for_global: 0,
    mkdp_open_to_the_world: 0,
    mkdp_open_ip: '',
    mkdp_echo_preview_url: 0,
    mkdp_browserfunc: '',
    mkdp_browser: '',
    mkdp_preview_options: {
      mkit: {},
      katex: {},
      uml: {},
      maid: {},
      disable_sync_scroll: 0,
      sync_scroll_type: 'middle',
      hide_yaml_meta: 1,
      sequence_diagrams: {},
      flowchart_diagrams: {},
      content_editable: false,
      disable_filename: 0,
      toc: {}
    },
    mkdp_markdown_css: '',
    mkdp_highlight_css: '',
    mkdp_port: '',
    mkdp_page_title: '「${name}」',
    mkdp_images_path: '',
    mkdp_filetypes: ['markdown'],
    mkdp_theme: '',
    mkdp_combine_preview: 0,
    mkdp_combine_preview_auto_refresh: 1,
    mkdp_clients_active: 0,
  };

  const nvim = {
    getVar: async (name) => {
      return defaultConfig[name];
    },
    call: async (func, args) => {
      if (func === 'winline') {
        return 1;
      } else if (func === 'winheight') {
        return 100;
      } else if (func === 'getpos') {
        return [0, 1, 1, 0];
      }
      return null;
    },
    setVar: async (name, value) => {
      defaultConfig[name] = value;
    },
    get buffers() {
      return [
        {
          id: 1,
          name: markdownFilePath,
          getLines: async () => fs.readFileSync(markdownFilePath, 'utf-8').split('\n'),
        },
      ];
    },
    get buffer() {
      return {
        id: 1,
      };
    },
    get window() {
      return {
        id: 1,
      };
    },
  };

  const plugin = {
    nvim,
    init: () => {},
    isStandalone: true,
  };

  return plugin;
};

module.exports = { createStandalonePlugin };
