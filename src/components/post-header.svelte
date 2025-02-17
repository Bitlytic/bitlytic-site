<script lang="ts">
    let {label, id}: {label: string, id?: string} = $props();
</script>

<h2 {id}>
    {label}
</h2>