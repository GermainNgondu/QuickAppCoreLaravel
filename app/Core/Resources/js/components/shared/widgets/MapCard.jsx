import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@ui";
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

export function MapCard({ title, center, zoom = 10, markers = [], mapId, className }) {
    // On demande explicitement à charger la librairie 'marker'
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['marker'] 
    });

    const mapOptions = {
        mapId: mapId || import.meta.env.VITE_GOOGLE_MAPS_ID, // Map ID est requis ici
        disableDefaultUI: false,
    };

    return (
        <Card className={className}>
            <CardHeader><CardTitle className="text-sm font-medium">{title}</CardTitle></CardHeader>
            <CardContent className="h-[400px] p-0 overflow-hidden relative">
                {isLoaded ? (
                    <GoogleMap 
                        mapContainerStyle={{ width: '100%', height: '100%' }} 
                        center={center} 
                        zoom={zoom}
                        options={mapOptions}
                    >
                        {/* MarkerF est la version "Functional" compatible React 18/19 
                            qui réduit les avertissements de dépréciation */}
                        {markers?.map((m, i) => (
                            <MarkerF 
                                key={i} 
                                position={{ lat: m.lat, lng: m.lng }} 
                                label={m.label}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted">Chargement...</div>
                )}
            </CardContent>
        </Card>
    );
}