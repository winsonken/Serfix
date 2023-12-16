import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function TermsScreen() {
  return (
    <View className="flex flex-1 bg-main-background px-5 py-5">
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="w-full h-full flex">
                <View>
                    <Text className="text-main-blue text-2xl font-bold">Terms of Service</Text>
                </View>

                <View className="flex py-5 gap-y-3">
                    <View>
                        <Text className="text-xl font-bold">1. Harga dan Pembayaran</Text>
                        <View>
                            <Text className="text-lg">- Harga layanan akan diinformasikan kepada pelanggan sebelum pekerjaan dimulai.</Text>
                            <Text className="text-lg">- Pembayaran harus dilakukan secara penuh pada saat penyelesaian layanan.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">2. Garansi Layanan</Text>
                        <View>
                            <Text className="text-lg">- Kami memberikan garansi selama 30 hari untuk layanan yang telah disediakan.</Text>
                            <Text className="text-lg">- Kerusakan yang disebabkan oleh penggunaan yang tidak benar atau perubahan konfigurasi oleh pelanggan tidak akan dicakup oleh garansi.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">3. Prosedur Klaim Garansi</Text>
                        <View>
                            <Text className="text-lg">- Klaim garansi harus diajukan dalam waktu 7 hari setelah penyelesaian layanan.</Text>
                            <Text className="text-lg">- Pelanggan harus menyediakan bukti pembelian asli dan deskripsi rinci tentang masalah yang timbul.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">4. Batas Tanggung Jawab</Text>
                        <View>
                            <Text className="text-lg">- Tanggung jawab kami terbatas pada kerusakan langsung akibat pekerjaan yang kami lakukan.</Text>
                            <Text className="text-lg">- Kami tidak bertanggung jawab atas kehilangan data yang mungkin terjadi selama atau setelah proses servis.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">5. Keamanan Data</Text>
                        <View>
                            <Text className="text-lg">- Kami berkomitmen untuk menjaga keamanan data pelanggan.</Text>
                            <Text className="text-lg">- Pelanggan bertanggung jawab untuk mencadangkan data penting sebelum layanan dimulai.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">6. Waktu Pengerjaan</Text>
                        <View>
                            <Text className="text-lg">- Perkiraan waktu pengerjaan akan disampaikan kepada pelanggan sebelum pekerjaan dimulai.</Text>
                            <Text className="text-lg">- Keterlambatan mungkin terjadi karena masalah tak terduga; pelanggan akan diberitahu tentang perkiraan waktu yang baru.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">7. Persetujuan Pemilik</Text>
                        <View>
                            <Text className="text-lg">- Pemilik perangkat harus memberikan persetujuan tertulis sebelum layanan dimulai.</Text>
                            <Text className="text-lg">- Kami berhak menolak layanan jika persetujuan tidak diberikan.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">8. Kebijakan Pembatalan</Text>
                        <View>
                            <Text className="text-lg">- Pembatalan harus dilakukan setidaknya 24 jam sebelum janji layanan.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">9. Hak untuk Menolak Layanan</Text>
                        <View>
                            <Text className="text-lg">- Kami berhak menolak layanan jika perangkat dalam keadaan rusak parah atau tidak dapat diperbaiki.</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-xl font-bold">10. Hak Cipta dan Kepemilikan Intelektual</Text>
                        <View>
                            <Text className="text-lg">- Hak cipta dan kepemilikan intelektual terkait dengan perangkat lunak atau materi lain yang disediakan oleh pelanggan tetap menjadi hak milik pelanggan.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}