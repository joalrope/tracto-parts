const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              /* -------- Colors ----------- */
              '@primary-color': '#f2bd15',
              '@secondary-color': '#000000bf',

              //Background color for `<body>`
              '@body-background': '#000',

              // Buttons
              '@btn-default-color': '@secondary-color',
              '@btn-default-border': '@secondary-color',

              '@btn-primary-color': '@secondary-color',
              '@btn-primary-border': '@secondary-color',

              // Checkbox
              '@checkbox-size': '17px',
              '@checkbox-color': '@primary-color',
              '@checkbox-check-color': '#000',
              '@checkbox-check-bg': '@white',
              '@checkbox-border-width': '@border-width-base',
              '@checkbox-group-item-margin-right': '8px',

              // The background colors for active and hover states for things like
              // list items or table cells.
              '@item-active-bg': '@primary-color',
              '@item-hover-bg': '@primary-color',

              // Menu
              // ---

              '@menu-inline-toplevel-item-height': '40px',
              '@menu-item-height': '40px',
              '@menu-item-group-height': '@line-height-base',
              '@menu-collapsed-width': '80px',
              //'@menu-bg': '@component-background',
              '@menu-popup-bg': '@component-background',
              '@menu-item-color': '@primary-color',
              //'@menu-inline-submenu-bg': '@background-color-light',
              //'@menu-highlight-color': '@primary-color',
              '@menu-highlight-danger-color': '@error-color',
              //'@menu-item-active-bg': '@primary-1',
              //'@menu-item-active-danger-bg': '@red-1',
              '@menu-item-active-border-width': '3px',
              '@menu-item-group-title-color': '@text-color-secondary',
              '@menu-item-vertical-margin': '4px',
              '@menu-item-font-size': '@font-size-base',
              '@menu-item-boundary-margin': '8px',
              '@menu-item-padding-horizontal': '20px',
              '@menu-item-padding': '0 @menu-item-padding-horizontal',
              '@menu-horizontal-line-height': '46px',
              '@menu-icon-margin-right': '10px',
              '@menu-icon-size': '@menu-item-font-size',
              '@menu-icon-size-lg': '@font-size-lg',
              '@menu-item-group-title-font-size': '@menu-item-font-size',

              // dark theme
              '@menu-dark-color': '@primary-color',
              '@menu-dark-danger-color': '@error-color',
              '@menu-dark-bg': '@secondary-color',
              '@menu-dark-arrow-color': '#fff',
              '@menu-dark-inline-submenu-bg': '#000c17',
              '@menu-dark-highlight-color': '@secondary-color',
              '@menu-dark-item-active-bg': '@primary-color',
              '@menu-dark-item-active-danger-bg': '@error-color',
              '@menu-dark-selected-item-icon-color': '@white',
              '@menu-dark-selected-item-text-color': '@white',
              '@menu-dark-item-hover-bg': '@primary-color',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
