import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function AboutScreen() {
  return (
    <View className="flex flex-1 bg-main-background px-5 py-5">
        <View className="w-full h-full flex gap-y-3">
            <View>
                <Text className="text-center text-lg font-medium">Serfix adalah aplikasi servis smartphone, laptop, dan komputer yang memiliki komitmen untuk mengbantu menyelesaikan kendala perangkat yang dialami oleh user. </Text>
            </View>

            <View className="flex flex-col gap-y-2">
                <View className="bg-[#89CFF3] rounded-md px-5 py-3">
                    <Text className="text-xl font-medium">Visi</Text>
                    <Text className="text-lg">Membantu menyelesaikan kendala perangkat yang dialami user dengan penuh komitmen dan kepercayaan dengan menggunakan aplikasi serfix.</Text>
                </View>

                <View className="bg-[#89CFF3] rounded-md px-5 py-3">
                    <Text className="text-xl font-medium">Misi</Text>
                    <View>
                        <Text className="text-lg">1. Menyediakan berbagai banyak jenis servis yang dibutuhkan user.</Text>
                        <Text className="text-lg">2. Bekerja sama dengan mitra - mitra terpercaya.</Text>
                        <Text className="text-lg">3. Mengedepankan kritik dan saran user untuk mengembangkan aplikasi serfix menjadi lebih baik.</Text>
                    </View>
                </View>
            </View>
        </View>

        <StatusBar style="auto" />
    </View>
    
  )
}