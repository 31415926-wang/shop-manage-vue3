    <!-- 
        使用步骤：

        1.传入的表格tableCols结构数组，每一项的内容：
            prop: '',     //列对应的属性名
            label: '',   //列的标签
            width: 3,   //列的宽度
            sortable: true  //该列是否可排序
            searchType: 'input',  加入查询字段，并且显示查询框类型
            show:false   //是否显示
            rebuild：true   //是否重写改列，当显示内容的格式/样式要自定义的时候

        2.initCrud初始化表格，参数：表格ref实例、题目名称、api请求方法对象、tableCols结构、[自定义函数：对请求后的每列表进行格式处理或者追加属性]

        initCrud(CrudTableRef, {
                title: 'xx',
                apiMethod: xxApiMethod
            },
                tableCols, 
                handlexxFn
            );


            
        #其它：

        1.操作列：

           -开启操作列，默认图标形式：
            <CrudTable ref="CrudTableRef" :needOperate="true">

           -拓展操作列，通过插槽operateExpand；自定义整个操作列，开启customOperate

            <template #operateExpand="{ rowInfo }">
                <el-button text type='primary' class="mini" icon="EditPen" @click="handleColEditor(rowInfo.id)">编辑</el-button>
            </template>

            :customOperate="true"


        2.自定义数据列，开启rebuild后，结合插槽：

            <template v-slot:列key+Col="{ scope }">
                <el-text type="warning">{{ scope.row?.列key }}</el-text>
            </template>

        
        3.查询字段的开启：

           配置列结构使用searchType: 'input'  ，指定其输入的基本类型，输入框与原生的Data\number等，下拉或者其它的应自定义。

           自定义查询的字段及内容：通过自定义插槽，绑定好参数即可。

            <template v-slot:search-custom="{ scope }">
                <el-form-item label="物资状态">
                    <el-select v-model="scope.searchParam.status" >
                        <el-option v-for="item in GOODSTATUS_OPTIONS" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </template>




        注意：

             1.api必须统一暴露出对象，且方法名称需按如下：
                getList
                addItem
                updateItem
                deleteItem
             
             2.若需手动调用表格api，如手动获取数据、删除等
                CrudTableRef.value.hookCrudObject.crudInfo.ApiMethod.deleteItem(id);
                CrudTableRef.value.hookCrudObject.getData();


        -->





<template>
    <!-- 查询
    需要参数：查询字段，查询的标签、输入框类型
    -->

    <div class="CrudTableContainer">

    <div class="searchSection" v-show="(Object.keys(hookCrudObject.searchParam.value).length > 0) && searchStatus">
        <Search :hookCrudObjectParam="hookCrudObject">
            <template #default="{ scope }">
                <slot name="search-custom" :scope="scope"></slot>
            </template>
        </Search>
    </div>

    <!-- 批量、导出、新增 -->
    <div class="toolSection">
        <div>
            <el-button v-if="defaultToolBtList.includes('add')" type="primary" icon="Plus" @click="handleAdd">新增</el-button>
            <!-- 自定义添加批量操作的功能 -->
            <slot name="batchSlot">
            </slot>
            <el-button v-if="defaultToolBtList.includes('delete') && needBatch"  type="danger" icon="Delete"
                :disabled="hookCrudObject.crudInfo.value.selectedItems?.length == 0"
                @click="hookCrudObject.deleteRow(0, true)">删除</el-button>
            <el-button v-if="defaultToolBtList.includes('export')"  type="success" icon="Download"
                @click="hookCrudObject.handleExportTable">导出</el-button>
        </div>

        <div class="middleBox"></div> 

        <!-- 小工具 -->
        <div class="toolBox" v-if="!hiddenToolSection">
            <ToolGroup ref="ToolGroupSection" v-model:searchStatus="searchStatus" :hookCrudObjectParam="hookCrudObject">
            </ToolGroup>
        </div>
    </div>


    <!-- 表格体 -->
    <el-table class="tableSection" :data="hookCrudObject.tableData.value" border style="width: 100%;" :size="size"
        :cell-style="{ 'text-align': 'center','height':rowHeight }" :header-cell-style="{ 'text-align': 'center', 'color': '#000' }"
        :highlight-current-row="isHighlightRow" @selection-change="handleSelectionChange" 
        row-key="id"
        :tree-props="treeProps"
        >

        <el-table-column type="selection" width="55" v-if="needBatch" 
        :reserve-selection="true"
        />
        <el-table-column type="index" label="序号" width="55" v-if="needIndex" />

        <!--自定义会出现嵌套的列 -->
        <slot name="nestCol">
        </slot>



        <template v-for="(item, index) in hookCrudObject.tableCols.value" :key="index">
            <!--
            <el-table-column :label="item.label" :prop="item.prop" :min-width="item.width ? item.width : 0"
                :sortable="item.sortable" v-if="item.show">
            -->
            <el-table-column :label="item.label" :prop="item.prop" :width="item.width ? item.width:''"
                :sortable="item.sortable" v-if="item.show">
                <!-- 在需要自定义列内容时，传入插槽即可；对应字段需设置rebuild
                -->
                <template #default="scope" v-if="item.rebuild">
                    <slot :name="item.prop + 'Col'" :scope="scope"></slot>
                </template>

            </el-table-column>
        </template>


        <el-table-column v-if="needOperate" fixed="right" label="操作" :width="Number(width)<768? null: (operateColWidth?operateColWidth:null)">
            <template #default="scope">
                <div style="padding: 10px 0;">
                    <!-- 嵌入其它操作按钮 -->
                    <slot name="operateExpand" :rowInfo="scope.row"></slot>

                    <!-- 是否使用传统的按钮样式及功能 -->
                    <!-- 图标操作按钮、还是文字操作按钮 -->
                    <span v-if="!customOperate" >
                              <el-button v-if="!closeViewDetail" :type="useIconType?'info':'primary'" class="mini" icon="View"
                                :text="!useIconType"  
                                @click="handleViewDetail(scope.row)">{{useIconType?'':'详细'}}</el-button>

                            <el-button :type="useIconType?'warning':'primary'" class="mini" icon="EditPen" 
                                :text="!useIconType" 
                                @click="handleEditor(scope.row)">{{useIconType?'':'编辑'}} </el-button>

                            <Popover :type="useIconType?'danger':'primary'"  :text="!useIconType"  class="mini" icon="Delete" title="删除" :operate="useIconType? '':'删除'"
                                @handle="hookCrudObject.deleteRow(scope.row.id)">
                            </Popover> 
                    </span>

                </div>
            </template>
        </el-table-column>


    </el-table>

    <!-- 对应官网，如果传入page-size、total，要有对应的处理回调，尤其是page-size，且布局有sizes -->
    <Pagination background class="pageSection" :layout="pageLayout" :current-page="hookCrudObject.page.value"
        :page-size="hookCrudObject.size.value" :total="hookCrudObject.total.value"
        :page-sizes="pageSizes" :hookCrudObjectParam="hookCrudObject"></Pagination>
    </div>

    <!-- 弹出框 -->
    <!-- 详细:默认有，自定义写插槽即可 -->
    <Dialog ref="detailForm" :width="dialogWidths.detail" :title="hookCrudObject.title.value + '详细'"
        v-if="!closeViewDetail" :rowInfo="rowInfo" :tableCols="hookCrudObject.tableCols">
        <slot name="detailForm" :rowInfo="rowInfo">
        </slot>
    </Dialog>

    <!-- 新增：直接写表单项，但是处理回调需在总组件传 -->
    <Dialog ref="addForm" :width="dialogWidths.add" :title="hookCrudObject.title.value + '新增'" :needSubmit="true"
        @submitFn="handleSubmit" @handleCloseBefore="closeBeforeFn" @handleOpenBefore="$emit('openDialogBefore')">
        <slot name="addForm" :formInfo="formInfo"></slot>
    </Dialog>

    <!-- 编辑：直接写表单项，但是处理回调需在总组件传 -->
    <Dialog ref="editorForm" :width="dialogWidths.editor" :title="hookCrudObject.title.value + '编辑'" :needSubmit="true"
        @submitFn="handleSubmit" @handleCloseBefore="closeBeforeFn" @handleOpenBefore="$emit('openDialogBefore')">
        <slot name="editorForm" :formInfo="formInfo"></slot>
    </Dialog>
</template>



<script setup lang='ts'>
import hookCrud from '@/hook/crud/index'
import { ref ,onMounted } from 'vue';
import Popover from './Popover.vue'
import Pagination from './Pagination.vue'
import ToolGroup from './ToolGroup.vue'
import Search from './Search.vue'
import Dialog from './Dialog.vue'
import { treeProps } from 'element-plus/es/components/tree-v2/src/virtual-tree';
import {useSlots,computed} from "vue"
import { useWindowSize } from '@vueuse/core'

 let uSlots = useSlots()
const { width, height } = useWindowSize()


 //判断是否有传某个插槽
 const hasUseSlot=(key :string)=>{
    return Object.keys(uSlots).includes(key);
 }  

// import { useAttrs } from 'vue';
// let $useAttrs = useAttrs();  //接收的方法与参数

let $prop = defineProps({
    size: {
        type: String,
        default: 'default'
    },
    isHighlightRow: {
        type: Boolean,
        default: false
    },
    rowHeight: {
        type: String,
        default: 'auto'
    },
    'pageLayout': {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    },
    needBatch: { //是否需要多选
        type: Boolean,
        default: false
    },
    needIndex: { //是否需要序号
        type: Boolean,
        default: true
    },
    needOperate: {
        type: Boolean,
        default: false
    },
    closeViewDetail: {
        type: Boolean,
        default: false
    },
    //弹出框的大小，默认新增、修改适配一列表单项的，而详细框两列
    dialogWidths: {
        type: Object,
        default: {
            add: '20%',
            editor: '20%',
            detail: '34%'
        }
    },
    operateColWidth: { //操作列的宽度
        type: Number
    },
    operateButtonType: { //操作图标的表现形式
        type: String,
        default: 'iconType'
    },
    // addCheckForm、editorCheckForm在使用到新增、编辑封装的弹出框，都需分别用到
    addCheckForm: {
        type: Object,
        default: {}
    },
    editorCheckForm: {
        type: Object,
        default: {}
    },
    hiddenToolSection: {//隐藏所有工具按钮
        type: Boolean,
        default: false
    },
    customOperate: {
        type: Boolean,
        default: false
    },
    needReqDetail: {  //是否需要在编辑/详细按钮点击时根据id得到详细信息
        type: Boolean,
        default: false
    },
    //不给table设置该属性或者传空对象，都是以children属性判断有没有展开
    treeProps: {
        type: Object,
        default: {}
    },
    defaultToolBtList:{
        type:Array,
        default: ['add','delete','export']
    },
    pageSizes:{
        type:Array,
        default:[10, 20, 30, 40, 50, 100]
    }

})

/* 
     beforeSubmitHanle :提交表单前可以处理格式
     openDialogBefore:打开弹框前需执行的函数，如获取下拉框
*/
let $emit = defineEmits(['openDialogBefore', 'beforeSubmitHanle']);


let hookCrudObject = hookCrud();


//查询的开关
let searchStatus = ref(true)

let rowInfo = ref({});//点击单行的信息存储
let formInfo = ref({} as any);//弹框填写表单

//ref获取实例
let detailForm = ref();
let addForm = ref();
let editorForm = ref();

//是否开启是图标操作按钮
const useIconType =computed(()=>{
    return $prop.operateButtonType == 'iconType'? true :false;
})


//可能出现弹出框表单校验
let nowFormType = ref(''); //表示当前是弹出框的类型，新增还是编辑框。
// let addCheckForm = ref();
// let editorCheckForm = ref();

//行的多选处理
const handleSelectionChange = (val: any) => {
    hookCrudObject.crudInfo.value.selectedItems = val;
    // val[0].name='1111'  //会影响原表格
    console.log("已选项目",val);
    
}

//点击详细按钮
const handleViewDetail = async (row: any) => {
    //是否请求单个id对应的详细数据
    judgeReqDetail(row);

    detailForm.value.dialogVisible = true;

}

//点击新增
const handleAdd = () => {

    addForm.value.dialogVisible = true;
    formInfo.value = {};
    nowFormType.value = 'add';
}

//点击编辑 
const handleEditor = async (row: any) => {
    //是否请求单个id对应的详细数据
    judgeReqEditor(row);

    editorForm.value.dialogVisible = true;
    nowFormType.value = 'editor';
}

const judgeReqDetail = async (row: any) => {
    if ($prop.needReqDetail) {
        let result = await hookCrudObject.getRowDetail(row.id);
        rowInfo.value = result!;
    } else {
        rowInfo.value = { ...row };
    }
}
const judgeReqEditor = async (row: any) => {

    if ($prop.needReqDetail) {
        let result = await hookCrudObject.getRowDetail(row.id);
        formInfo.value = result!;
    } else {
        formInfo.value = { ...row };
    }
}





const beforeSubmit = () => {

    let type = nowFormType.value;
    let refGoal: string = type == 'add' ? 'addCheckForm' : 'editorCheckForm';

    //判断是否有弹出框校验表单
    if ((type == 'add' && $prop.addCheckForm) || (type == 'editor' && $prop.editorCheckForm)) {
        // console.log("有校验");
        // @ts-ignore
        return $prop[refGoal].validate((valid: any) => {
            // console.log("校验结果", valid);
            if (!valid) {
                throw 'error'
            }
        })

    } else {
        // console.log("无校验");
        return Promise.resolve("Success")
    }

}

const handleSubmit = (callback: any) => {

    //校验表单
    beforeSubmit().then(async () => {
        console.log("beforeSubmit通过 / 没有校验");

        //提交前处理数据
        $emit('beforeSubmitHanle', formInfo);

        //调接口
        try {
            let resultMsg = await hookCrudObject.addOrUpdate((formInfo.value.id ? 1 : 0), formInfo.value);
            callback(true)
        } catch (error) {
            callback(false)
        }
    }).catch(() => {
        // console.log("beforeSubmit不通过");
        callback(false)
    })

}

const closeBeforeFn = () => {
    let type = nowFormType.value;
    let refGoal: string = type == 'add' ? 'addCheckForm' : 'editorCheckForm';
    //判断是否有弹出框校验表单
    if ((type == 'add' && $prop.addCheckForm) || (type == 'editor' && $prop.editorCheckForm)) {
        // @ts-ignore
        $prop[refGoal].resetFields()
    }
}


defineExpose({
    hookCrudObject,
    nowFormType
})

</script>



<style scoped lang='scss'>
div[class$="Section"],
.tableSection {
    margin-bottom: 23px;
}

.searchSection {
    margin-bottom: 6px !important;
}

.toolSection {
    display: flex;
    position: relative;

    .middleBox {
        flex-grow: 1;
    }
}

.checkboxGroup {
    display: flex;
    flex-direction: column;
}

.el-button+span {
    margin-left: 12px;
}

/* 以下修改树形表格的图标 */
/* 去掉默认图标 */
::v-deep .el-table__expand-icon>.el-icon>svg {
    display: none !important;
    ;
}

::v-deep .el-table__expand-icon {
    width: 1.1rem !important;
    height: 1.1rem !important;
    position: relative;
    top: 1px;
}


::v-deep .el-table__expand-icon>.el-icon {
    /* 默认的inline-flex会使伪元素无法溢出 */
    display: inline-block;
    height: 100%;
    width: 100%;
    position: relative;
}

::v-deep .el-table__expand-icon>.el-icon::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 100%;
    background-image: url('@/assets/images/icons/fold-right.svg');
    background-size: 100% 100%;
}

</style>

<style>
/* 手机尺寸下，按钮间取消间距，因为按钮一般都换行 */
@media screen and (max-width:768px) {
    .CrudTableContainer .el-button+.el-button{
         margin-left: 0 !important;
    } 

    .el-button + span{
    margin-left: 0 !important;
    }
}

</style>