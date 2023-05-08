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
        }

        awnser = "";
        event.currentTarget[0].checked = false;
        event.currentTarget[1].checked = false;
    }

    function setAwnser(event: any) {
        awnser = event.currentTarget.value;
    }
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
        <section>
            your score is {score} <br />
            return to <a rel="external" href="/" class="underline">home</a>
        </section>
    {/if}
</section>

<style>
    label {
        transition: ease 0.3s;
    }

    label:hover {
        letter-spacing: 0.06rem;
    }
</style>
