<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    let score = 0;
    let index = 0;
    let show = true;
    $: question = data.questions[index][0];
    $: awnsers = data.questions[index][1];
    $: rightAwnser = data.questions[index][2];
    let awnser = "";

    function submit(event: any) {
        if (awnser == "") {
            return;
        }

        if (awnser == rightAwnser) {
            score += 1;
        }

        if (index < data.questions.length - 1) {
            index += 1;
        } else if (index == data.questions.length - 1) {
            show = false;
            setTimeout(toggleFireworks, 2500)
            setTimeout(deleteFireworks, 3999)
        }

        awnser = "";
        event.currentTarget[0].checked = false;
        event.currentTarget[1].checked = false;
    }

    function setAwnser(event: any) {
        awnser = event.currentTarget.value;
    }

    import { Fireworks } from "@fireworks-js/svelte";
    import type { FireworksOptions } from "@fireworks-js/svelte";
    import { onMount } from "svelte";
    let fw: Fireworks;
    let enabled = true;
    let options: FireworksOptions = {
        opacity: 0.5,
    };
    function toggleFireworks() {
        const fireworks = fw.fireworksInstance();
        if (fireworks.isRunning) {
            fireworks.waitStop();
        } else {
            fireworks.start();
        }
    }
    function deleteFireworks() {
        document.querySelector(".fireworks").remove();
    }
    onMount(() => {
        const fireworks = fw.fireworksInstance();
        console.log(fireworks);
    });
</script>

<section
    class="grid h-screen justify-center items-center align-center bg-misty-rose"
>
    {#if show == true}
        <form on:submit|preventDefault={submit} class="grid gap-2">
            <h1 class="text-xl">{question}</h1>
            <section>
                {#each awnsers as awnser}
                    <input
                        on:change={setAwnser}
                        type="radio"
                        id={awnser}
                        name="awnser"
                        value={awnser}
                    />
                    <label for={awnser}>{awnser}</label> <br />
                {/each}
            </section>
            <input
                type="submit"
                value="submit"
                class="bg-paynes-gray px-4 py-2 rounded cursor-pointer text-white hover:shadow-2xl transition duration-150"
            />
        </form>
    {:else}
        <Fireworks id="canvas" bind:this={fw} autostart={true} {options} class="fireworks opacity-100 z-10" />
        <section class="text-center">
            <p class="text-xl font-bold mb-1">
                your score is {score} <br />
            </p>
            <p>
                return to <a rel="external" href="/" class="underline">home</a>
            </p>
        </section>
    {/if}
</section>


<style>
    :global(.fireworks) {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        background: #000;
        animation: fade 4s linear;
    }

    @keyframes fade{
     80%{
        opacity: 1;
     }
     100%{
        opacity: 0;
     }
    }

    .buttons {
        display: flex;
        gap: 4px;
        position: absolute;
        z-index: 1;
    }
    label {
        transition: ease 0.3s;
    }

    label:hover {
        letter-spacing: 0.06rem;
    }
</style>
