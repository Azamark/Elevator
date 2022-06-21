<template>
    <div class="levels">
        <div v-for="level in levels" :key="level.name">
            <input type="radio"
                :id="level.name"
                v-model="picked"
                :value="level.value"
                @change="selected"
            >
            <label :for="level.name">{{level.name}}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        levelsCnt: [Number],
    },
    data() {
        return {
            picked: 1,
            levels: [],
        }
    },
    methods: {
        selected() {
            this.$emit("selected", this.picked);
        }
    },
    created() {
        for(let i = 0; i < this.levelsCnt; i++){
            this.levels.unshift({
                name: `lvl-${i+1}`,
                value: i+1
            })
        }
        this.$emit('levels-ready', this.levels);
    },
    mounted() {
        if(localStorage.getItem('picked')) {
            try {
                this.picked = localStorage.getItem('picked')
            } catch (e) {
                localStorage.removeItem('picked');
            }
        }
    },
    watch: {
        picked(newVal) {
            console.log('сохраняем значение picked')
            localStorage.setItem('picked', newVal);
        }
    }
}
</script>