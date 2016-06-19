# jquery.choosearea
省市区三级联动
　默认选择
new $.choosearea({
selectDomId: {
province: "selProvince",
city: "selCity",
county: "selCounty"
},
initAreaIds: {Province:"0",City:"0",County:"0"}
});
　指定选择
new $.choosearea({
                selectDomId: {
                    province: "selProvince",
                    city: "selCity",
                    county: "selCounty"
                },
                initAreaIds:  {Province:"1",City:"1",County:"9"} 
            });