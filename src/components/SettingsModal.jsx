import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Cpu, 
  Server, 
  Check, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw, 
  Cloud, 
  ShieldCheck,
  Globe,
  Terminal
} from 'lucide-react';
import { testVolcanoConnection } from '../services/doubaoService';

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  setApiKey,
  endpointId,
  setEndpointId,
  modelName,
  setModelName,
  onResetToDefaults
}) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    const res = await testVolcanoConnection(apiKey, endpointId);
    setTestResult(res);
    setTesting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff2442] flex items-center justify-center text-white">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">系统核心配置中心</h3>
              <p className="text-xs text-slate-400">字节跳动火山引擎豆包大模型 · 阿里云 CI/CD 部署</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 text-sm">
          
          {/* Section 1: Volcano Engine Doubao API */}
          <div className="flex flex-col gap-4 bg-slate-900/60 p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Key className="w-4 h-4 text-[#ff2442]" />
                字节跳动火山引擎 · 豆包大模型配置
              </div>
              <a 
                href="https://console.volcengine.com/ark" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
              >
                火山引擎控制台 <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* API Key */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>火山引擎 API Key (ARK_API_KEY)</span>
                <span className="text-slate-500 font-mono text-[11px]">ark-xxxx</span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="例如：ark-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="glass-input text-xs font-mono"
              />
            </div>

            {/* Endpoint ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>推理接入点 ID (DOUBAO_ENDPOINT_ID)</span>
                <span className="text-slate-500 font-mono text-[11px]">ep-2024xxxx-xxxxx</span>
              </label>
              <input
                type="text"
                value={endpointId}
                onChange={(e) => setEndpointId(e.target.value)}
                placeholder="例如：ep-2024060401xxxx-xxxxx (在火山方舟在线推理中获取)"
                className="glass-input text-xs font-mono"
              />
              <p className="text-[11px] text-slate-400">
                提示：在火山引擎【大模型即服务 Ark ➔ 在线推理 ➔ 接入点管理】创建接入点即可获得此 ID。
              </p>
            </div>

            {/* Test Connection Button */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleTestConnection}
                disabled={testing}
                className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
              >
                {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                {testing ? '正在测试连接...' : '测试 API 连通性'}
              </button>

              {testResult && (
                <div className={`text-xs font-medium flex items-center gap-1.5 ${testResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
                  {testResult.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Alibaba Cloud Deployment & CI/CD */}
          <div className="flex flex-col gap-3 bg-slate-900/60 p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Globe className="w-4 h-4 text-cyan-400" />
              阿里云 ECS & GitHub Actions CI/CD 自动化上线
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              本项目已内置标准 <code className="bg-slate-800 text-cyan-300 px-1 py-0.5 rounded font-mono">.github/workflows/deploy.yml</code> 自动化流水线，支持在代码推送到 GitHub 时，一键自动构建并发布到您的域名 <strong className="text-white">www.vanpower.net</strong>（阿里云 ECS Nginx 目录）。
            </p>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex flex-col gap-1.5 text-xs font-mono text-slate-300">
              <div className="text-slate-400 font-bold mb-1">📋 需要在 GitHub 仓库 Settings ➔ Secrets 填写的环境变量：</div>
              <div>• <span className="text-amber-300">ECS_HOST</span>: 您的阿里云 ECS 公网 IP</div>
              <div>• <span className="text-amber-300">ECS_USER</span>: 服务器用户名（如 root）</div>
              <div>• <span className="text-amber-300">SSH_PRIVATE_KEY</span>: SSH 部署私钥</div>
              <div>• <span className="text-amber-300">ECS_TARGET_DIR</span>: Nginx 站点根目录（如 /var/www/vanpower）</div>
              <div>• <span className="text-amber-300">VOLC_API_KEY</span>: 火山引擎 API Key</div>
              <div>• <span className="text-amber-300">DOUBAO_ENDPOINT_ID</span>: 豆包推理接入点 ID</div>
            </div>
          </div>

          {/* Section 3: Reset Factory Defaults */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="text-slate-400">重置所有预设素材与博主画像数据：</div>
            <button
              onClick={() => {
                if (window.confirm('确定要恢复出厂默认数据吗？当前自定义素材将被重置。')) {
                  onResetToDefaults();
                  onClose();
                }
              }}
              className="text-red-400 hover:text-red-300 hover:underline cursor-pointer"
            >
              恢复出厂预设
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 flex justify-end bg-slate-900/50">
          <button
            onClick={onClose}
            className="btn-xhs text-xs py-2 px-6"
          >
            保存并关闭
          </button>
        </div>

      </div>
    </div>
  );
}
