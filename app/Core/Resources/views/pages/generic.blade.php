@extends('core::layouts.app')

@section('title', $title)

@section('content')
    <div class="w-full">
        @isset($heading)
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">{{ $heading }}</h1>
            </div>
        @endisset

        {!! $component !!}
    </div>
@endsection