<template>
    <div>
        <div class="level level-box" 
            v-for="level in levels" :key="level.name"
        >
            <lvl-button
                :state="state"
                :level="level"
                @selected="selected"
            />
        </div>
    </div>
</template>

<script>
import LvlButton from "./Lvl-button.vue"
export default {
    components: {LvlButton},
    props: {
        levels: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
    
        }
    },
    methods: {
        selected(data) {
            this.$emit("selected", data);
        }
    },
    // created() {
    //     for(let i = 0; i < this.levelsCnt; i++) {
    //         this.levels.unshift({
    //             name: `lvl-${i+1}`,
    //             value: i+1
    //         })
    //     }
    // }
}
</script>