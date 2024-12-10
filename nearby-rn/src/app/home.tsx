import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import { api } from "@/services/api"

export default function Home() {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.error(error)
      Alert.alert("Categorias", "Não foi possível carregar as categorias.")
    }
  }

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({})