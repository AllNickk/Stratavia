'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function YourInfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    paisNascimento: '',
    paisResidenciaAtual: '',
    cidadeAtual: '',
    nacionalidades: '', // Será convertido em array no backend
    residenciaFiscal: {
      declaradoEmOutroPais: false,
      vistoOuCidadaniaExterior: false,
      pretendeMudarProx12Meses: 'nao'
    },
    atividadeProfissional: {
      principal: 'outro',
      tipoTrabalho: 'pessoa_fisica',
      prestaServicoPara: 'ambos',
      regimeTrabalho: 'remoto'
    },
    origemRenda: {
      brasilPercent: 0,
      estadosUnidosPercent: 0,
      europaPercent: 0,
      outrosPercent: 0,
      localGeracao: 'ambos',
      formasRecebimento: '' // Será convertido em array
    },
    perfilFinanceiro: {
      rendaMensalBRL: 0,
      rendaAnualEstimado: 0,
      reinveste: false
    },
    mobilidadeInternacional: {
      dispostoMudarPais: 'nao',
      paisesInteresse: '',
      tempoForaBrasil: '0 meses'
    }
  });

  // Recuperar ID do usuário do localStorage após o login
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
    } else {
      router.push('/'); // Redireciona se não houver usuário logado
    }
  }, [router]);

  const handleNestedChange = (section, field, value, type = 'text') => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: type === 'checkbox' ? value : value
      }
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/formInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...formData }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Erro ao salvar dados');

      setSuccess('Informações atualizadas com sucesso!');
      setTimeout(() => router.push('/chat'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Complete seu Perfil Fiscal
        </h1>

        {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Seção 1: Identificação Básica */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Identificação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">País de Nascimento</label>
                <input type="text" name="paisNascimento" value={formData.paisNascimento} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cidade Atual</label>
                <input type="text" name="cidadeAtual" value={formData.cidadeAtual} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Nacionalidades (separadas por vírgula)</label>
                <input type="text" name="nacionalidades" value={formData.nacionalidades} onChange={handleChange} placeholder="Ex: Brasileira, Italiana" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
            </div>
          </section>

          {/* Seção 2: Atividade Profissional */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Atividade Profissional</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Profissão Principal</label>
                <select 
                  value={formData.atividadeProfissional.principal} 
                  onChange={(e) => handleNestedChange('atividadeProfissional', 'principal', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="desenvolvedor">Desenvolvedor</option>
                  <option value="designer">Designer</option>
                  <option value="consultor">Consultor</option>
                  <option value="empresa_servicos">Empresa de Serviços</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Regime de Trabalho</label>
                <select 
                  value={formData.atividadeProfissional.regimeTrabalho} 
                  onChange={(e) => handleNestedChange('atividadeProfissional', 'regimeTrabalho', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="remoto">Remoto</option>
                  <option value="hibrido">Híbrido</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>
            </div>
          </section>

          {/* Seção 3: Perfil Financeiro */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Perfil Financeiro</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Renda Mensal (BRL)</label>
                <input 
                  type="number" 
                  value={formData.perfilFinanceiro.rendaMensalBRL} 
                  onChange={(e) => handleNestedChange('perfilFinanceiro', 'rendaMensalBRL', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                />
              </div>
              <div className="flex items-center mt-6">
                <input 
                  type="checkbox" 
                  checked={formData.perfilFinanceiro.reinveste} 
                  onChange={(e) => handleNestedChange('perfilFinanceiro', 'reinveste', e.target.checked, 'checkbox')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                />
                <label className="ml-2 block text-sm text-gray-900">Costuma reinvestir capital?</label>
              </div>
            </div>
          </section>

          {/* Seção 4: Residência Fiscal */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Residência Fiscal</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={formData.residenciaFiscal.declaradoEmOutroPais} 
                  onChange={(e) => handleNestedChange('residenciaFiscal', 'declaradoEmOutroPais', e.target.checked, 'checkbox')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                />
                <label className="ml-2 block text-sm text-gray-900">Possui declaração fiscal em outro país?</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pretende se mudar nos próximos 12 meses?</label>
                <select 
                  value={formData.residenciaFiscal.pretendeMudarProx12Meses} 
                  onChange={(e) => handleNestedChange('residenciaFiscal', 'pretendeMudarProx12Meses', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                  <option value="talvez">Talvez</option>
                </select>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-bold"
            >
              {loading ? 'Salvando...' : 'Salvar Informações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}