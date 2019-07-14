"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("./misc/util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Responsible for loading an async module.
 */
var Loader =
/*#__PURE__*/
function () {
  function Loader(loader, provider, config) {
    _classCallCheck(this, Loader);

    this._loader = loader;
    this._provider = provider;
    this._config = config;
    this._service = null;
    this._loading = null;
    this.value = null;
  }

  _createClass(Loader, [{
    key: "_fetch",
    value: function _fetch() {
      var _this = this;

      if (this._service) return Promise.resolve(this._service);
      if (!this._loader) throw new Error('Async loader is not referenced to a service');
      return this._loader().then(function (Service) {
        _this._service = Service["default"] || Service;
        return _this._service;
      });
    }
  }, {
    key: "load",
    value: function load(onlyNew) {
      var _this2 = this;

      if (this.value && onlyNew) return Promise.resolve();

      if (this._loading) {
        if (onlyNew) return Promise.resolve();
        return this._loading;
      }

      if (this.value) return Promise.resolve(this.value); // Continue fetching and creating instance

      this._loading = this._fetch().then(function (Service) {
        var result;

        if ((0, _util._isConstructor)(Service)) {
          result = new Service(_this2._provider, _this2._config && _this2._config(_this2._provider));
        } else if ((0, _util._isFunction)(Service)) {
          result = Service();
        } else {
          result = Service;
        }

        _this2.value = result;
        _this2._loading = null;
        return result;
      });
      return this._loading;
    }
  }]);

  return Loader;
}();
/**
 * Export
 */


var _default = Loader;
exports["default"] = _default;