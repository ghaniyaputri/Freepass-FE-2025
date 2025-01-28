import Layout from "../Layout";

const About = () => {
    return (
        <Layout>
            <div className="space-y-6 p-6">
                <section>
                    <h1 className="text-3xl font-bold">About TokoOwren</h1>
                    <p>
                        Selamat datang di TokoOwren, platform e-commerce yang dirancang untuk memberikan pengalaman
                        berbelanja online terbaik bagi Anda! Kami hadir sebagai solusi untuk memenuhi kebutuhan Anda
                        dengan produk-produk berkualitas, harga kompetitif, dan pelayanan yang mengutamakan kenyamanan pelanggan.
                    </p>
                </section>

                <section>
                    <h1 className="text-3xl font-bold">Siapa Kami?</h1>
                    <p>
                        TokoOwren adalah marketplace modern yang menghubungkan penjual dan pembeli dari berbagai penjuru,
                        menghadirkan berbagai kategori produk seperti fashion, elektronik, kebutuhan rumah tangga, makanan & minuman,
                        hingga produk lokal yang unik. Kami percaya bahwa belanja online harus sederhana, aman, dan menyenangkan.
                    </p>
                </section>

                <section>
                    <h1 className="text-3xl font-bold">Mari Tumbuh Bersama Kami</h1>
                    <p>
                        Di TokoOwren, kami tidak hanya ingin menjadi platform belanja online, tetapi juga komunitas yang mendukung dan berkembang bersama.
                        Baik Anda pembeli setia maupun penjual yang ingin memperluas bisnis, kami hadir untuk membantu Anda mencapai tujuan.
                    </p>
                </section>
            </div>
        </Layout>
    );
};

export default About;