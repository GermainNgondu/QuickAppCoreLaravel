<script>
    window.App = {
        name: "{{ config('app.name') }}",
        url: "{{ config('app.url') }}",
        logo : "{{ asset(setting('app_logo', 'core/assets/files/images/logo.png')) }}",
        locale: "{{ app()->getLocale() }}",
        csrf: "{{ csrf_token() }}",
        currentRoute: "{{ Route::currentRouteName() }}",
        version: "1.0.0"
    };
</script>