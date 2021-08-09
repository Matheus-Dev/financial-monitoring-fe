<template>
    <div class="main-page">
        <div class="title-page">
            <h2>Controle Financeiro</h2>
        </div>
        <div class="financial-control-area">
            <FinancialControlSearch :data="data" :columns="columns" :parameters="parameters" @updateData="updateData" @updateParameters="updateParameters"></FinancialControlSearch>
            <FinancialControlTable :data="data" @updateData="updateData"></FinancialControlTable>
            <FinancialControlPaginate :data="data" :parameters="parameters" @updateData="updateData" @updateParameters="updateParameters"></FinancialControlPaginate>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FinancialControlSearch from "@/components/FinancialControlSearch.vue";
import FinancialControlTable from "@/components/FinancialControlTable.vue";
import FinancialControlPaginate from "@/components/FinancialControlPaginate.vue"
import { getAllClients } from "@/services/financial-control.api";
@Component({
    components: {
        FinancialControlSearch,
        FinancialControlTable,
        FinancialControlPaginate
    },
})
export default class Home extends Vue {

    public data = []

    public parameters = {
        search: "",
        field: "name",
        page: 1,
        limit: 10
    }

    public columns = [
        { id: 1, title: 'Nome do Cliente', field: 'name', orderActive: false, order: 'asc'},
        { id: 2, title: 'Titulo', field: 'title', orderActive: false, order: 'asc'},
        { id: 3, title: 'Valor', field: 'value', orderActive: false, order: 'asc' },
        { id: 4, title: 'Desde', field: 'defaultedSince', orderActive: false, order: 'asc' }
    ]

    updateData(data: any) {
        this.data = data
    }

    updateParameters(parameters: any) {
        this.parameters = parameters
    }

    mounted() {
        this.fetchData()
    }

    async fetchData() {
        const resp = await getAllClients(this.parameters);

        if (resp.status === 200) {
            this.data = resp.data
        }
    }
}
</script>
<style>
.main-page {
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 10rem;
    margin-right: 10rem;
}
.title-page {
    width: 100%;
    background-color: #04AA6D;
    color: #fff;
    font-style: italic;
}
.financial-control-area {
    width: 100%;
    border-style: groove;
    padding: 4rem;
}
</style>