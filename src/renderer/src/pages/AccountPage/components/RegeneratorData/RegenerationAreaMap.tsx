/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { PushCoordProps } from '../Tabs/RegenerationAreaTab/RegenerationAreaTab'
import { useTranslation } from 'react-i18next'

interface Props {
  coords: PushCoordProps[]
}

export function RegenerationAreaMap({ coords }: Props): JSX.Element {
  const { t } = useTranslation()
  const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
  const mapRef = useRef<mapboxgl.Map>()
  const mapContainerRef = useRef<HTMLDivElement>()
  const markersRef = useRef<mapboxgl.Marker[]>([])

  const centerMap = {
    lat: coords.length > 0 ? coords[0].lat : -23.29,
    lng: coords.length > 0 ? coords[0].lng : -48.08
  }

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN ? MAPBOX_ACCESS_TOKEN : ''
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef?.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [centerMap.lng, centerMap.lat],
      zoom: 15
    })

    mapRef.current.on('load', () => {
      mapRef.current!.addSource('polygon', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[]]
          }
        }
      })

      mapRef.current!.addLayer({
        id: 'polygon-layer-1',
        type: 'fill',
        source: 'polygon',
        layout: {},
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.3
        }
      })

      mapRef.current!.addLayer({
        id: 'polygon-border-1',
        type: 'line',
        source: 'polygon',
        layout: {},
        paint: {
          'line-color': '#088',
          'line-width': 2
        }
      })
    })

    return (): void => {
      mapRef.current?.remove()
    }
  }, [centerMap])

  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    coords.forEach((coordinate) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([coordinate?.lng, coordinate?.lat])
        .addTo(mapRef.current!)

      markersRef.current.push(marker)
    })

    if (coords.length > 2) {
      const polygonCoords: [number, number][] = coords.map((coord) => [coord.lng, coord.lat])
      if (polygonCoords.length > 0) {
        polygonCoords.push([...polygonCoords[0]])
      }

      ;(mapRef.current!.getSource('polygon') as mapboxgl.GeoJSONSource)?.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [polygonCoords]
        }
      })
    } else {
      ;(mapRef.current!.getSource('polygon') as mapboxgl.GeoJSONSource)?.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[]]
        }
      })
    }
  }, [coords])

  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-300 text-sm">{t('regenerationArea')}</p>
      <div
        //@ts-ignore
        ref={mapContainerRef}
        className="w-[450px] h-[300px] rounded-2xl border-2 border-white mt-1"
      />
    </div>
  )
}
