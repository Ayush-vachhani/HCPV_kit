<script>

</script>

<nav>
    <ul>
        <li><a href="/movable_gas_actual">Movable Gas Actual</a></li>
        <li><a href="/movable_gas_production">Movable Gas Production</a></li>
        <li><a href="/movable_oil_actual">Movable Oil Actual</a></li>
        <li><a href="/movable_oil_production">Movable Oil Production</a></li>
        <li><a href="/oil_actual">Oil Actual</a></li>
        <li><a href="/oil_production">Oil Production</a></li>
    </ul>
</nav>

<section>
    <slot/>
</section>

<style>
    nav ul {
        list-style: none;
        padding: 0;
    }

    nav ul li {
        display: inline;
        margin-right: 20px;
    }

    nav a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
    }

    nav a:hover {
        text-decoration: underline;
    }

    section {
        padding: 20px;
    }
</style>
