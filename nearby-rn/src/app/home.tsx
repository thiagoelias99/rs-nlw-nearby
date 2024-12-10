import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import { api } from "@/services/api"
import { Categories, CategoriesProps } from "@/components/categories"
import { PlaceProps } from "@/components/place"
import { Places } from "@/components/places"

type MarketsProps = PlaceProps & {
  latitude: number
  longitude: number
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")
  const [markets, setMarkets] = useState<MarketsProps[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (!category) return
    fetchMarkets()
  }, [category])

  async function fetchCategories() {
    try {
      const { data } = await api.get<CategoriesProps>("/categories")
      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.error(error)
      Alert.alert("Categorias", "Não foi possível carregar as categorias.")
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return
      }

      const { data } = await api.get<MarketsProps[]>("/markets/category/" + category)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Locais", "Não foi possível carregar os locais.")
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <Places data={markets} />
    </View>
  )
}

const styles = StyleSheet.create({})