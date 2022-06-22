<template>
    <div class="levels">
        <div class="level level-box"
            :class="[level.value === isReadyLvl ? 'lvl-ready' : '']" 
            v-for="level in levels" :key="level.name"
        >
            <input type="radio" :color="color"
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
        isReadyLvl: [Number],
        levelsCnt: [Number],
    },
    data() {
        return {
            picked: 1,
            levels: [],
            color: 'none'
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