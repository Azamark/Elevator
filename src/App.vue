<template>
    <p>{{picked}}</p>
    <div
        v-for="level in levels"
        :key="level.name"
    >
        <input type="radio"
            v-model="picked" 
            :id="level.name"
            :value="level.value"
            @change="select"
        >
        <label :for="level.name">{{level.name}}</label>
    </div>
</template>

<script>
export default {
    data() {
        return { 
            levels: [
                {name: 'One',value: 1},
                {name: 'Two',value: 2},
                {name: 'Three',value: 3},
                {name: 'Four',value: 4},
                {name: 'Five',value: 5}
            ],
            picked: 1,
            callStack: []
        }
    },
    methods: {
        select() {
            console.log(this.picked);
            let find = this.callStack.find( el => {
                return el === this.picked
            });
            if(find) {
                console.log('Вызов уже в очереди');
            } else {
                this.callStack.push(this.picked);
                console.log(`Вызов на ${this.picked} этаж`);
                console.log(`Очередь вызовов ${this.callStack}`);
            }
        }
    }
}
</script>


