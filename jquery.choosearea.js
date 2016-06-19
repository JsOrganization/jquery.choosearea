/**
 * jquery.choosearea.js - 地区联动封装
*/
; (function ($) {
    var choosearea = function (options) {
        this.set = $.extend({
            dataUrl: "/Content/Js/city_code.js",
            selectDomId: {
                province: "a",
                city: "b",
                county: "c"
            },
            data: null,
            initAreaIds: {
                Province: 0,
                City: 0,
                County: 0
            },
            eventInterface: {
                renderProvinceList: function (list, selectedId) {
                    this.jq_province.empty().append($(this.ProvinceListHtml(list, selectedId, "请选择省")));
                },
                renderCityList: function (list, selectedId, isInit) {
                    var city = this.jq_city;
                    isInit = typeof (isInit) == "undefined" ? false : true;
                    city.empty().append($(this.CityListHtml(list, selectedId, "请选择市")));
                },
                renderCountyList: function (list, selectedId, isInit) {
                    var optionsHtml = this.CountyListHtml(list, selectedId, "请选择县");
                    var county = this.jq_county;
                    isInit = typeof (isInit) == "undefined" ? false : true;
                    county.empty().append($(optionsHtml));
                },
                onchanged: function (cityId) {

                }
            }

        }, options);
        this.provinceList = [];
        this.cityList = [];
        this.countyList = [];
        this.jq_province = $("#" + this.set.selectDomId.province);
        this.jq_city = $("#" + this.set.selectDomId.city);
        this.jq_county = $("#" + this.set.selectDomId.county);
        this._init();
    };
    choosearea.prototype = {};
    choosearea.fn = choosearea.prototype;
    choosearea.fn._init = function () {
        var _this = this;
        $.get(_this.set.dataUrl, {}, function (datajson) {
            _this.set.data = datajson
            _this._setAreaList();
            _this._initRender(_this.set.initAreaIds.Province, _this.set.initAreaIds.City, _this.set.initAreaIds.County);
            _this._initEvents();
        }, "json");
    };
    //设置地区列表
    choosearea.fn._setAreaList = function () {
        this.provinceList = this.set.data.provinceList;
        this.cityList = this.set.data.cityList;
        this.countyList = this.set.data.countyList;
    };

    //初始化渲染
    choosearea.fn._initRender = function (provinceId, cityId, countyId) {

        this.set.eventInterface.renderProvinceList.call(this, this.provinceList, provinceId);
        var cityList = $.grep(this.cityList, function (n, i) {
            return n.ProID == provinceId;
        });
        this.set.eventInterface.renderCityList.call(this, cityList, cityId, true);
        var countyList = $.grep(this.countyList, function (n, i) {
            return n.CityID == cityId;
        });
        this.set.eventInterface.renderCountyList.call(this, countyList, countyId, true);
    };

    //渲染列表
    choosearea.fn.ProvinceListHtml = function (list, selectedId, firstTips) {
        firstTips = firstTips || "";
        var selectedAttr = selectedId == 0 ? " selected='selected'" : "";
        var optionsHtml = firstTips != "" ? "<option value='0' " + selectedAttr + ">" + firstTips + "</option>" : "";

        if (typeof (list) != "undefined") {
            $.each(list, function (i, city) {
                var selAttr = selectedId == city.ProID ? " selected='selected'" : "";
                optionsHtml += "<option value='" + city.ProID + "' " + selAttr + ">" + city.ProName + "</option>";
            });
        };
        return optionsHtml;
    };
    //渲染列表
    choosearea.fn.CityListHtml = function (list, selectedId, firstTips) {
        firstTips = firstTips || "";
        var selectedAttr = selectedId == 0 ? " selected='selected'" : "";
        var optionsHtml = firstTips != "" ? "<option value='0' " + selectedAttr + ">" + firstTips + "</option>" : "";

        if (typeof (list) != "undefined") {
            $.each(list, function (i, city) {
                var selAttr = selectedId == city.CityID ? " selected='selected'" : "";
                optionsHtml += "<option value='" + city.CityID + "' " + selAttr + ">" + city.CityName + "</option>";
            });
        };
        return optionsHtml;
    };
    //渲染列表
    choosearea.fn.CountyListHtml = function (list, selectedId, firstTips) {
        firstTips = firstTips || "";
        var selectedAttr = selectedId == 0 ? " selected='selected'" : "";
        var optionsHtml = firstTips != "" ? "<option value='0' " + selectedAttr + ">" + firstTips + "</option>" : "";
        //console.log(list);
        if (typeof (list) != "undefined") {
            $.each(list, function (i, city) {
                var selAttr = selectedId == city.Id ? " selected='selected'" : "";
                optionsHtml += "<option value='" + city.Id + "' " + selAttr + ">" + city.DisName + "</option>";
            });
        };
        return optionsHtml;
    };
    //初始化事件
    choosearea.fn._initEvents = function () {
        var province = this.jq_province;
        var city = this.jq_city;
        var county = this.jq_county;
        var _this = this;
        province.change(function () {
            var id = parseInt($(this).val());
            var cityList = $.grep(_this.cityList, function (n, i) {
                return n.ProID == id;
            });
            _this.set.eventInterface.renderCityList.call(_this, cityList, 0);
            _this.set.eventInterface.renderCountyList.call(_this, [], 0, false);
        });

        city.change(function () {
            var id = parseInt($(this).val());
            var countyList = $.grep(_this.countyList, function (n, i) {
                return n.CityID == id;
            });
            _this.set.eventInterface.renderCountyList.call(_this, countyList, 0, false);
        });
    };
    $.choosearea = choosearea;
})(jQuery);