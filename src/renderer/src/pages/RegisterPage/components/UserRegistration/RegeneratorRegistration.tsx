/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'
import { ProofPhoto } from './ProofPhoto'
import { useTranslation } from 'react-i18next'
import { useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { sequoiaRegeneratorAbi, sequoiaRegeneratorAddress } from '@renderer/services/contracts'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { calculateArea } from '@renderer/services/calculateArea'
import { InvitationProps } from '@renderer/types/invitation'
import { ConfirmButton } from './ConfirmButton'
import { WriteContractErrorType } from 'viem'
import { base64ToBlob, uploadToIpfs } from '@renderer/services/ipfs'

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
interface Props {
  name: string
  invitation: InvitationProps
}

export function RegeneratorRegistration({ name, invitation }: Props): JSX.Element {
  const { t } = useTranslation()
  const [proofPhoto, setProofPhoto] = useState('')
  const [disableBtnRegister, setDisableBtnRegister] = useState(false)
  const mapRef = useRef<mapboxgl.Map>()
  const mapContainerRef = useRef<HTMLDivElement>()
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [coordinates, setCoordinates] = useState<{ longitude: number; latitude: number }[]>([])
  const [totalArea, setTotalArea] = useState(0)
  const [uploadingImage, setUploadingImage] = useState(false)

  const chainId = useChainId()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN ? MAPBOX_ACCESS_TOKEN : ''
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef?.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-48.08, -23.29],
      zoom: 1
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
        id: 'polygon-layer',
        type: 'fill',
        source: 'polygon',
        layout: {},
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.3
        }
      })

      mapRef.current!.addLayer({
        id: 'polygon-border',
        type: 'line',
        source: 'polygon',
        layout: {},
        paint: {
          'line-color': '#088',
          'line-width': 2
        }
      })
    })

    mapRef.current.on('click', (e) => {
      setCoordinates((prevState) => [
        ...prevState,
        { latitude: e.lngLat.lat, longitude: e.lngLat.lng }
      ])
    })

    return (): void => {
      mapRef.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    coordinates.forEach((coordinate) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([coordinate?.longitude, coordinate?.latitude])
        .addTo(mapRef.current!)

      markersRef.current.push(marker)
    })

    if (coordinates.length > 2) {
      const polygonCoords: [number, number][] = coordinates.map((coord) => [
        coord.longitude,
        coord.latitude
      ])
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

    handleCalculateArea()
  }, [coordinates])

  useEffect(() => {
    validityData()
  }, [name, proofPhoto, invitation, coordinates, totalArea])

  function validityData(): void {
    if (!name.trim()) {
      setDisableBtnRegister(true)
      return
    }

    if (!proofPhoto.trim()) {
      setDisableBtnRegister(true)
      return
    }

    if (coordinates.length < 3 || coordinates.length > 10) {
      setDisableBtnRegister(true)
      return
    }

    if (totalArea < 500) {
      setDisableBtnRegister(true)
      return
    }

    if (invitation?.userType !== 1) {
      setDisableBtnRegister(true)
      return
    }

    setDisableBtnRegister(false)
  }

  async function uploadProofPhoto(): Promise<string> {
    setUploadingImage(true)
    const blobImage = base64ToBlob(proofPhoto)
    const response = await uploadToIpfs({ file: blobImage })
    setUploadingImage(false)
    return response.hash
  }

  async function handleRegister(): Promise<void> {
    if (isLoading || isPending || uploadingImage) return

    const hashProofPhoto = await uploadProofPhoto()

    if (hashProofPhoto === '') {
      alert('error on upload proof photo')
      return
    }

    writeContract({
      address: chainId === 1600 ? sequoiaRegeneratorAddress : sequoiaRegeneratorAddress,
      abi: chainId === 1600 ? sequoiaRegeneratorAbi : sequoiaRegeneratorAbi,
      functionName: 'addRegenerator',
      args: [totalArea, name, hashProofPhoto, coordinates]
    })
  }

  function handleClearSelection(): void {
    setCoordinates([])
  }

  function handleDeleteLastPoint(): void {
    setCoordinates((prevState) => prevState.slice(0, -1))
  }

  function handleCalculateArea(): void {
    const response = calculateArea(coordinates)
    setTotalArea(response)
  }

  return (
    <div className="flex flex-col mb-10 z-0">
      <ProofPhoto proofPhoto={proofPhoto} onChange={setProofPhoto} />

      <div className="flex flex-col p-3 rounded-2xl bg-green-card w-fit mt-8">
        <p className="text-gray-300 text-sm">{t('demarcateYourProperty')}</p>

        <div
          //@ts-ignore
          ref={mapContainerRef}
          className="w-[450px] h-[300px] rounded-2xl border-2 border-white mt-1"
        />

        <p className="text-white mt-1">
          {t('areaSize')}: {Intl.NumberFormat('pt-BR').format(totalArea)}m²
        </p>

        <div className="flex items-center justify-center gap-5 mt-3">
          <button
            onClick={handleClearSelection}
            className="text-white underline font-semibold hover:cursor-pointer"
          >
            {t('clearSelection')}
          </button>
          <button
            onClick={handleDeleteLastPoint}
            className="text-white underline font-semibold hover:cursor-pointer"
          >
            {t('removeLastPoint')}
          </button>
        </div>
      </div>

      <ConfirmButton
        btnDisabled={disableBtnRegister}
        handleRegister={handleRegister}
        hash={hash}
        isLoading={isLoading}
        isPending={isPending}
        isSuccess={isSuccess}
        error={error as WriteContractErrorType}
        uploadingImage={uploadingImage}
      />
    </div>
  )
}
