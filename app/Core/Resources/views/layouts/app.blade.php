<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
    <head>
        @include('core::partials.meta')
        
        <link rel="shortcut icon" href="{{ asset(setting('app_favicon', 'core/assets/files/images/favicon.ico')) }}" type="image/x-icon">
        <title>@yield('title') | {{ setting('app_name', config('app.name')) }}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

         @vite(['app/Core/Resources/css/app.css', 'app/Core/Resources/js/core/app.jsx'])
    </head>
    <body class="h-full antialiased font-sans text-slate-900 bg-background">
        
        <div id="app-root">
            @yield('content')
        </div>

        @include('core::partials.scripts')
    </body>
</html>