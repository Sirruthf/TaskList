<script lang="ts">

    export default {
        methods: {
            async send () {
                let data = new FormData();

                data.set("login", (this.$refs.login as HTMLFormElement).value);
                data.set("password", (this.$refs.password as HTMLFormElement).value);

                let response = await fetch("/auth/login", {
                    method: "POST",
                    body: data
                });

                let responseStatus = response.status;

                if (responseStatus == 200)
                    document.location.href = "/";
                else
                    console.log(responseStatus);
            }
        }
    };

</script>

<template>

    <main>

        <div class="form" ref="form">

            <input class="input login" placeholder="name" ref="login">
            <input class="input password" placeholder="password" ref="password">
            <input class="input submit" type="button" value="log in" @click="send">

        </div>

    </main>

</template>

<style lang="css" scoped>

    main {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.form {
		display: flex;
        flex-direction: column;

		width: 20%;
		height: 20%;
	}

    .input {
        flex-grow: 1;
        padding-left: 5%;
    }

</style>